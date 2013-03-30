var BH = module.exports = function() {
    var bemhtmlMatchers = {};

    this.toHtml = toHtml;
    var processBemjson = this.processBemjson = function(bemjson, blockName) {
        var res;
        if (bemjson === false || bemjson == null) {
            return null;
        } else if (typeof bemjson == 'string') {
            return bemjson;
        } else if (Array.isArray(bemjson)) {
            res = [];
            for (i = 0, l = bemjson.length; i < l; i++) {
                res.push(processBemjson(bemjson[i], blockName));
            }
            return res;
        } else {
            var content, i, l;
            if (bemjson.elem && !bemjson.block) {
                blockName = bemjson.block = bemjson.block || blockName;
            } else {
                blockName = bemjson.block || blockName;
            }
            bemjson = matchBemjson(bemjson, blockName);
            if (Array.isArray(bemjson)) {
                for (i = 0, l = bemjson.length; i < l; i++) {
                    bemjson[i] = processBemjson(bemjson[i], blockName);
                }
            } else {
                if (content = bemjson.content) {
                    for (i = 0, l = content.length; i < l; i++) {
                        content[i] = processBemjson(content[i], blockName);
                    }
                }
            }
            return bemjson;
        }
    };
    this.match = function(expr, matcher) {
        (bemhtmlMatchers[expr] || (bemhtmlMatchers[expr] = [])).push(matcher);
    };
    function matchBemjson(bemjson, blockName) {
        var baseMatch = bemjson.block + (bemjson.elem ? '__' + bemjson.elem : ''),
            mods = bemjson.mods,
            matchExprList = [],
            j, l;
        for (i in mods) {
            if (mods.hasOwnProperty(i)) {
                matchExprList.push(baseMatch + '_' + i + '_' + mods[i]);
            }
        }
        matchExprList.push(baseMatch);


        bemjson.cls = bemjson.cls ? (Array.isArray(bemjson.cls) ? bemjson.cls : [bemjson.cls]) : [];
        bemjson.attrs = bemjson.attrs || {};
        for (i = 0, l = matchExprList.length; i < l; i++) {
            var matchers = bemhtmlMatchers[matchExprList[i]], subRes;
            if (matchers) {
                for (j = matchers.length - 1; j >= 0; j--) {
                    subRes = matchers[j](bemjson);
                    if (subRes) {
                        return matchBemjson(subRes, blockName);
                    }
                }
            }
        }

        return bemjson;
    }
};

var selfCloseHtmlTags = {
    area: 1,
    base: 1,
    br: 1,
    col: 1,
    command: 1,
    embed: 1,
    hr: 1,
    img: 1,
    input: 1,
    keygen: 1,
    link: 1,
    meta: 1,
    param: 1,
    source: 1,
    wbr: 1
};

function toHtml(json) {
    var res, i, l;
    if (json === false || json == null) return '';
    if (Array.isArray(json)) {
        res = [];
        for (i = 0, l = json.length; i < l; i++) {
            res.push(toHtml(json[i]));
        }
        return res.join('');
    } else if (typeof json == 'string') {
        return json;
    } else {
        var cls = json.bem !== false && json.block ? toFullBEMNames(json) : '',
            jattr, attrs = [];

        if (jattr = json.attrs) {
            for (i in jattr) {
                if (jattr.hasOwnProperty(i)) {
                    attrs.push(i + '="' + jattr[i] + '"');
                }
            }
        }

        attrs = attrs.length ? ' ' + attrs.join(' ') : '';

        json.cls.length && (cls = cls ? cls + ' ' + json.cls.join(' ') : json.cls.join(' '));

        var content, tag = (json.tag || 'div');
        res = ['<' + tag + (cls ? ' class="' + cls + '"' : '') + attrs];

        if (selfCloseHtmlTags[tag]) {
            res.push('/>')
        } else {
            res.push('>');
            if (content = json.content) {
                res.push(toHtml(content));
            }
            res.push('</' + tag + '>');
        }
        return res.join('');
    }
}

function toFullBEMNames(json, blockName) {
    var mods, res, base = (json.block || blockName)
        + (json.elem ? '__' + json.elem : '');
    if (mods = json.mods) {
        res = [];
        for (var i in mods) {
            if (mods.hasOwnProperty(i)) {
                res.push(base + '_' + i + '_' + mods[i]);
            }
        }
        return res.join(' ');
    } else {
        return base;
    }
}
module.exports = BH;