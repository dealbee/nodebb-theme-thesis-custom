'use strict';

var striptags = require('striptags');
var meta = require.main.require('./src/meta');
var user = require.main.require('./src/user');
var db = require.main.require('./src/database');
var groups = require.main.require('./src/groups');
var async = module.parent.require('async');
var moment = require('./lib/modules/moment')
var library = {};

library.init = function (params, callback) {
    var app = params.router;
    var middleware = params.middleware;

    app.get('/admin/plugins/thesis-custom', middleware.admin.buildHeader, renderAdmin);
    app.get('/api/admin/plugins/thesis-custom', renderAdmin);

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
            data.templateData.mainPost = data.templateData.posts[0]
            let cid = await library.canPinCids(data.templateData.loggedInUser.uid)
            data.templateData.privileges['topics:pindealbee'] = (cid.indexOf(cid) >= 0) || data.templateData.privileges.isAdminOrMod
            next(null, null)
        }
    ], function (err, res) {
        // console.log(data.templateData);
        callback(null, data);
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
module.exports = library;

