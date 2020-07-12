'use strict';

const striptags = require('striptags');
const meta = require.main.require('./src/meta');
const user = require.main.require('./src/user');
const db = require.main.require('./src/database');
const groups = require.main.require('./src/groups');
const async = module.parent.require('async');
const moment = require('./lib/modules/moment')
const modulesSockets = module.parent.require('./socket.io/modules');
const socketIndex = module.parent.require('./socket.io/index');
const privileges = require.main.require('./src/privileges');
const topics = require.main.require('./src/topics');
const notifications = require.main.require('./src/notifications');
let library = {};

library.init = function (params, callback) {
    var app = params.router;
    var middleware = params.middleware;

    app.get('/admin/plugins/thesis-custom', middleware.admin.buildHeader, renderAdmin);
    app.get('/api/admin/plugins/thesis-custom', renderAdmin);
    modulesSockets.submitNote = function (socket, data, callback) {
        let topic = null;
        let error = null;
        async.waterfall([
            async function (callback) {
                topic = await db.client.collection('objects').find({_key: `topic:${data.tid}`}).toArray();
                topic = topic[0];
                topic.note = data.content;
                try {
                    db.client.collection('objects').save(topic);
                    socketIndex.server.sockets.emit('note-edit', data);
                } catch (e) {
                    error = e;
                    topic = null;
                }
            }
        ], function (err, res) {
            callback(error, topic);
        });
    }
    callback();
};

library.addAdminNavigation = function (header, callback) {
    header.plugins.push({
        route: '/plugins/thesis-custom',
        icon: 'fa-paint-brush',
        name: 'Thesis custom Theme'
    });

    callback(null, header);
};

library.getTeasers = function (data, callback) {
    data.teasers.forEach(function (teaser) {
        if (teaser && teaser.content) {
            teaser.content = striptags(teaser.content, ['img']);
        }
    });
    callback(null, data);
};

library.defineWidgetAreas = function (areas, callback) {
    areas = areas.concat([
        {
            name: "Categories Sidebar",
            template: "categories.tpl",
            location: "sidebar"
        },
        {
            name: "Category Sidebar",
            template: "category.tpl",
            location: "sidebar"
        },
        {
            name: "Topic Sidebar",
            template: "topic.tpl",
            location: "sidebar"
        },
        {
            name: "Categories Header",
            template: "categories.tpl",
            location: "header"
        },
        {
            name: "Category Header",
            template: "category.tpl",
            location: "header"
        },
        {
            name: "Topic Header",
            template: "topic.tpl",
            location: "header"
        },
        {
            name: "Categories Footer",
            template: "categories.tpl",
            location: "footer"
        },
        {
            name: "Category Footer",
            template: "category.tpl",
            location: "footer"
        },
        {
            name: "Topic Footer",
            template: "topic.tpl",
            location: "footer"
        }
    ]);

    callback(null, areas);
};

library.getThemeConfig = function (config, callback) {
    meta.settings.get('persona', function (err, settings) {
        config.hideSubCategories = settings.hideSubCategories === 'on';
        config.hideCategoryLastPost = settings.hideCategoryLastPost === 'on';
        config.enableQuickReply = settings.enableQuickReply === 'on';
        callback(null, config);
    });
};

function renderAdmin(req, res, next) {
    res.render('admin/plugins/persona', {});
}

library.addUserToTopic = function (data, callback) {
    if (data.req.user) {
        user.getUserData(data.req.user.uid, function (err, userdata) {
            if (err) {
                return callback(err);
            }

            data.templateData.loggedInUser = userdata;
            callback(null, data);
        });
    } else {
        data.templateData.loggedInUser = {
            uid: 0,
            username: '[[global:guest]]',
            picture: user.getDefaultAvatar(),
            'icon:text': '?',
            'icon:bgColor': '#aaa',
        };
        callback(null, data);
    }
};
library.addOptionalDataToTopic = function (data, callback) {
    async.waterfall([
        async function (next) {
            let tid = data.templateData.tid;
            let optionalData = await db.client.collection('objects').find({_key: `topic:${tid}`}).toArray();
            optionalData = optionalData[0];
            data.templateData.postcount = data.templateData.postcount - 1;
            library.formatOptionalData(optionalData);
            data.templateData.optionalData = optionalData;
            let uid = data.templateData.loggedInUser.uid;
            let isAdminOrMod = await library.isAdminOrMod(uid, data.templateData.cid);
            if ((isAdminOrMod || data.templateData.uid === data.templateData.loggedInUser.uid) && data.templateData.locked === 1) {
                data.templateData.privileges.editable = true;
                data.templateData.posts[0].display_moderator_tools = true;
                data.templateData.posts[0].display_post_menu = 1;
                data.templateData.posts[0].display_edit_tools = true;
            }
            if (!isAdminOrMod && data.templateData.uid === data.templateData.loggedInUser.uid && data.templateData.locked !== 1) {
                data.templateData.privileges.editable = false;
                data.templateData.posts[0].display_moderator_tools = false;
                data.templateData.posts[0].display_edit_tools = false;
                data.templateData.posts[0].display_post_menu = 0;
            }
            data.templateData.posts.forEach(post => {
                if (post.pid == data.templateData.mainPid) {
                    post.isMain = true;
                }
            })
            data.templateData.privileges.edit_note = await library.canTakeNote(data.templateData.loggedInUser.uid, data.templateData.cid);
            data.templateData.mainPost = data.templateData.posts[0]
            let cid = await library.canPinCids(data.templateData.loggedInUser.uid)
            data.templateData.privileges['topics:pindealbee'] = (cid.indexOf(cid) >= 0) || data.templateData.privileges.isAdminOrMod
            next(null, null)
        }
    ], function (err, res) {
        callback(null, data);
    });
}
// library.unreadBuild = function (data, callback) {
//     console.log(data.templateData.topics)
//     data.templateData.topics = data.templateData.topics.filter(topic => topic.locked == 1)
//     data.templateData.topicCount = data.templateData.topics.length;
//     callback(null, data);
// }
library.getUnreadTids = function (data, callback) {
    let filterLocked = async function (tids) {
        let tidsFull = await topics.getTopicsByTids(data.tids);
        return tidsFull
            .filter(tid => {
                if (tid.locked == 1) {
                    return tid
                }
            })
            .map(e => e.tid)
    }
    async.waterfall([
        async function (next) {
            for (let i in data.tidsByFilter) {
                data.tidsByFilter[i] = await filterLocked(data.tidsByFilter[i]);
                data.counts[i] = data.tidsByFilter[i].length
            }
            data.tids = await filterLocked(data.tids);
        }], function (err, res) {
        callback(null, data);
    });
}
library.topicCreate = function (data, callback) {
    let adminAndMods = null;
    async.waterfall([
        async function (next) {
            let isAdminOrMods = await library.isAdminOrMod(data.topic.uid, data.topic.cid)
            if (!isAdminOrMods) {
                adminAndMods = await library.getAllAdminAndMod(data.topic.cid);
                data.topic.locked = 1;
                notifications.create({
                    bodyShort: "[[thesiscustom:topic-in-queue]]",
                    path: '/topic/' + data.topic.tid,
                    nid: "queue:tid:" + data.topic.tid,
                    tid: data.topic.tid,
                    from: data.topic.uid,
                }, (err, notification) => {
                    notifications.push(notification, adminAndMods, () => {
                    });
                });
            }
        }], function (err, res) {
        callback(null, data);
    });
}
library.categoryBuild = function (data, callback) {
    data.templateData.topics = data.templateData.topics.filter(topic => {
        return topic.locked !== 1 || data.templateData.privileges.isAdminOrMod || data.templateData.privileges.uid === topic.user.uid
    })
    callback(null, data);
}
library.getCategoryTopics = function (data, callback) {
    let isAdminOrMod = null;
    async.waterfall([
        async function (next) {
            isAdminOrMod = await library.isAdminOrMod(data.uid, data.cid);
        }], function (err, res) {
        data.topics = data.topics.filter(topic => {
            return topic.locked !== 1 || isAdminOrMod || data.uid === topic.uid
        })
        callback(null, data)
    });
}
library.userBuild = function (data, callback) {
    let asyncForEach = async function (array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    let posts = data.templateData.posts;
    let bestPosts = data.templateData.bestPosts;
    async.waterfall([
        async function (next) {
            await asyncForEach(posts, async post => {
                post.topic.locked = await topics.isLocked(post.topic.tid)
            })
            await asyncForEach(bestPosts, async post => {
                post.topic.locked = await topics.isLocked(post.topic.tid)
            })
        }], function (err, res) {
        data.templateData.posts = posts
    });
    callback(null, data);
}
library.topicLock = function (data) {
    let topic = null;
    let userInfo = null;
    async.waterfall([
        async function (next) {
            let adminAndMods = await library.getAllAdminAndMod(data.topic.cid)
            adminAndMods = [...adminAndMods, data.topic.uid.toString()];
            adminAndMods = adminAndMods.filter(e => e !== data.uid.toString())
            adminAndMods = Array.from(new Set(adminAndMods));
            topic = await topics.getTopicsData([data.topic.tid])
            topic = topic[0]
            userInfo = await user.getUsers([data.uid], 1)
            userInfo = userInfo[0]
            let bodyShort = null;
            let nid = null;
            if (data.topic.isLocked) {
                bodyShort = `[[thesiscustom:lock-your-topic,${userInfo.username},${topic.title}]]`
                nid = 'lock:tid:' + data.topic.tid + ':uid:' + data.uid
                notifications.create({
                    bodyShort,
                    path: '/topic/' + data.topic.tid,
                    nid,
                    tid: data.topic.tid,
                    from: data.uid,
                }, (err, notification) => {
                    notifications.push(notification, adminAndMods, () => {
                    });
                });
            } else {
                bodyShort = `[[thesiscustom:unlock-your-topic,${userInfo.username},${topic.title}]]`
                nid = 'unlock:tid:' + data.topic.tid + ':uid:' + data.uid
                await notifications.rescind(`queue:tid:${data.topic.tid}`)
                notifications.create({
                    bodyShort,
                    path: '/topic/' + data.topic.tid,
                    nid,
                    tid: data.topic.tid,
                    from: data.uid,
                }, (err, notification) => {
                    notifications.push(notification, [data.topic.uid], () => {
                    });
                });
            }
            socketIndex.server.sockets.emit('topic-locked',data);
        }],function (err, res) {

    });
}
library.hasAllAttributes = function (optionalData, props) {
    let flag = false;
    props.forEach(i => {
        if (optionalData[i])
            flag = true;
    })
    return flag;
}
library.formatOptionalData = function (optionalData) {
    if (optionalData.currency)
        optionalData.currency = optionalData.currency.split(' - ')[0];
    if (optionalData.price)
        optionalData.price = numberWithCommas(optionalData.price)
    if (optionalData.discountPrice)
        optionalData.discountPrice = numberWithCommas(optionalData.discountPrice)
    if (optionalData.maxDiscount)
        optionalData.maxDiscount = numberWithCommas(optionalData.maxDiscount)
    if (optionalData.discountMoney)
        optionalData.discountMoney = numberWithCommas(optionalData.discountMoney)
    if (optionalData.expiredAt) {
        optionalData.expiredTime = moment(optionalData.expiredAt).format('hh:mm A')
        optionalData.expiredDate = moment(optionalData.expiredAt).format('DD-MM-YYYY')
        optionalData.isExpired = moment(optionalData.expiredAt) - moment() < 0
    }
}
let numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
library.getAllImagePath = function (content) {
    let str = content;
    let paths;
    let absolute = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    paths = str.match(absolute)
    let paths2 = [];
    if (paths) {
        paths.forEach(e => {
            if (allowedExtensions.exec(e)) {
                paths2.push(e)
            }
        })
    }
    paths2 = paths2.map((e, i) => {
        return {index: i, path: e}
    })
    return paths2
}
library.canPinCids = async function (uid) {
    //Get groups data that have privilige to pin to dealbee
    var groupsData = await db.client.collection('objects').find({_key: /privileges:groups:pindealbee:event:pin:members/}).toArray();
    //Get users data that have privilige to pin to dealbee
    var users = await db.client.collection('objects').find({_key: /privileges:pindealbee:event:pin:members/}).toArray();
    //Get groups' name
    var groupNames = [];
    groupsData.forEach(e => groupNames.push(e.value));
    //Get array of boolean determining user is in group
    var usersInGroup = await groups.isMemberOfGroups(uid, groupNames)
    var privilegeId = [];
    groupsData.forEach((e, i) => {
        if (usersInGroup[i] == true) {
            privilegeId.push(e._key);
        }
    })
    users.forEach(e => {
        if (e.value == uid.toString()) {
            privilegeId.push(e._key);
        }
    })
    var cids = privilegeId.map(e => e = e.split(":")[2]);
    cids = [...new Set(cids)];
    cids = cids.map(e => {
        return e = parseInt(e);
    })
    return cids;
}
library.canTakeNoteCids = async function (uid) {
    //Get groups data that have privilige to pin to dealbee
    let groupsData = await db.client.collection('objects').find({_key: /privileges:groups:editor:event:canTakeNote:members/}).toArray();
    //Get users data that have privilige to pin to dealbee
    let users = await db.client.collection('objects').find({_key: /privileges:editor:event:canTakeNote:members/}).toArray();
    //Get groups' name
    let groupNames = [];
    groupsData.forEach(e => groupNames.push(e.value));
    //Get array of boolean determining user is in group
    let usersInGroup = await groups.isMemberOfGroups(uid, groupNames)
    let privilegeId = [];
    groupsData.forEach((e, i) => {
        if (usersInGroup[i] == true) {
            privilegeId.push(e._key);
        }
    })
    users.forEach(e => {
        if (e.value == uid.toString()) {
            privilegeId.push(e._key);
        }
    })
    var cids = privilegeId.map(e => e = e.split(":")[2]);
    cids = [...new Set(cids)];
    return cids;
}
library.canTakeNote = async function (uid, cid) {
    let isAdmin = await privileges.users.isAdministrator(uid);
    let isGlobalMod = await privileges.users.isGlobalModerator(uid);
    let isMod = await privileges.users.isModerator(uid, cid);
    if (isAdmin || isGlobalMod || isMod) {
        return true
    }
    let cids = await this.canTakeNoteCids(uid);
    let result = new Set(cids).has(cid.toString());
    return result;
}
library.isAdminOrMod = async function (uid, cid) {
    let isAdmin = await privileges.users.isAdministrator(uid);
    let isGlobalMod = await privileges.users.isGlobalModerator(uid);
    let isMod = await privileges.users.isModerator(uid, cid);
    return isAdmin || isGlobalMod || isMod;
}
library.getAllAdminAndMod = async function (cid) {
    let asyncForEach = async function (array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    let members = await db.client.collection('objects').find({_key: `group:cid:${cid}:privileges:moderate:members`}).toArray();
    let groupsPri = await db.client.collection('objects').find({_key: `group:cid:${cid}:privileges:groups:moderate:members`}).toArray();
    members = members.map(member => member.value);
    groupsPri = groupsPri.map(group => group.value);
    groupsPri = [...groupsPri, "Global Moderators", "administrators"]
    await asyncForEach(groupsPri, async group => {
        let memsOfGroup = await groups.getMembers(group, 0, -1);
        members = [...members, ...memsOfGroup];
    })
    return Array.from(new Set(members));
}
module.exports = library;

