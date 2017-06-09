var settingCategory = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        dblClickExpand: false
    },
    callback: {
        onRightClick: OnRightClickCategory,
        onDrop: myOnDropCategory,
        beforeDrop: myBeforeDropCategory
    }
};

var settingProperty = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        dblClickExpand: false
    },
    callback: {
        onRightClick: OnRightClickProperty,
        onDrop: myOnDropProperty,
        beforeDrop: myBeforeDropProperty
    }
};

var zNodesCategory = [];
var zNodesProperty = [];
var befDropFatherCategory = '';
var befDropFatherProperty = '';
var zTreeCategory, zTreeProperty, rMenuCategory, rMenuProperty;
/*$(window).load(function() {
    loadCategories();
    loadProperties();
}); */


function myOnDropProperty(event, treeId, treeNodes, targetNode, moveType) {
    for (var i = 0; i < treeNodes.length; i++) {
        //Auf den Treenode pages die Categor[[]] löschen udn ersetzen durch den targetNode
        //Suche Vater
        if (befDropFatherProperty == null) {
            //Hatte keinen Vater Knoten bisher
            var pagename = treeNodes[i].name;
            $.ajax({
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'parse',
                    page: pagename,
                    prop: 'wikitext',
                    format: 'json'
                },
                type: 'GET',
                success: function(data) {
                    if (data && data.edit && data.edit.result == 'Success') {
                        //    alert ('Ich bin in der Methode mit der ID ' + shapeId);
                    } else if (data && data.error) {
                        //    alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                    } else {
                        var contentOld = data.parse.wikitext["*"];
                        var content = contentOld + "\n[[Subproperty of::" + targetNode.name.replace("Property:", "") + "]]";

                        writeWikiContent(content, pagename);
                    }

                },
                error: function(xhr) {
                    //     alert( 'Error: Request failed.' );
                }
            });
        } else {
            if (targetNode == null) {
                //Ist Root Knoten, hat also keine Category mehr, alle bisherigen löschen
                replaceProperties(treeNodes[i].name, ".*", "");
            } else {
                replaceProperties(treeNodes[i].name, befDropFatherProperty, "[[Subproperty of::" + targetNode.name.replace("Property:", "") + "]]");
            }

        }

    }
}

function myBeforeDropProperty(treeId, treeNodes, targetNode, moveType) {
    if (treeId == 'treeDemoCategory') {
        return false;
    } else {
        befDropFatherProperty = treeNodes[0].getParentNode();
        if (befDropFatherProperty != null) {
            befDropFatherProperty = befDropFatherProperty.name;
        }
    }
}

function replaceProperties(pagename, parentOld, parentNew) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            action: 'parse',
            page: pagename,
            prop: 'wikitext',
            format: 'json'
        },
        type: 'GET',
        success: function(data) {
            if (data && data.edit && data.edit.result == 'Success') {
                //    alert ('Ich bin in der Methode mit der ID ' + shapeId);
            } else if (data && data.error) {
                //    alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
            } else {
                var contentOld = data.parse.wikitext["*"];
                var content = contentOld.replace(new RegExp("\\[\\[Subproperty of::" + parentOld.replace("Property:", "") + "\\]\\]", 'g'), parentNew);

                writeWikiContent(content, pagename);
            }

        },
        error: function(xhr) {
            //     alert( 'Error: Request failed.' );
        }
    });
}



function myOnDropCategory(event, treeId, treeNodes, targetNode, moveType) {
    for (var i = 0; i < treeNodes.length; i++) {
        //Auf den Treenode pages die Categor[[]] löschen udn ersetzen durch den targetNode
        //Suche Vater
        if (befDropFatherCategory == null) {
            //Hatte keinen Vater Knoten bisher
            var pagename = treeNodes[i].name;
            $.ajax({
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'parse',
                    page: pagename,
                    prop: 'wikitext',
                    format: 'json'
                },
                type: 'GET',
                success: function(data) {
                    if (data && data.edit && data.edit.result == 'Success') {
                        //    alert ('Ich bin in der Methode mit der ID ' + shapeId);
                    } else if (data && data.error) {
                        //    alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                    } else {
                        var contentOld = data.parse.wikitext["*"];
                        var content = contentOld + "\n[[" + targetNode.name + "]]";

                        writeWikiContent(content, pagename);
                    }

                },
                error: function(xhr) {
                    //     alert( 'Error: Request failed.' );
                }
            });
        } else {
            if (targetNode == null) {
                //Ist Root Knoten, hat also keine Category mehr, alle bisherigen löschen
                replaceCategories(treeNodes[i].name, ".*", "");
            } else {
                replaceCategories(treeNodes[i].name, befDropFatherCategory, "[[" + targetNode.name + "]]");
            }

        }

    }
};

function myBeforeDropCategory(treeId, treeNodes, targetNode, moveType) {
    if (treeId == 'treeDemoProperty') {
        return false;
    } else {
        befDropFatherCategory = treeNodes[0].getParentNode();
        if (befDropFatherCategory != null) {
            befDropFatherCategory = befDropFatherCategory.name;
        }
    }

};

function replaceCategories(pagename, parentOld, parentNew) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            action: 'parse',
            page: pagename,
            prop: 'wikitext',
            format: 'json'
        },
        type: 'GET',
        success: function(data) {
            if (data && data.edit && data.edit.result == 'Success') {
                //    alert ('Ich bin in der Methode mit der ID ' + shapeId);
            } else if (data && data.error) {
                //    alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
            } else {
                var contentOld = data.parse.wikitext["*"];
                var content = contentOld.replace(new RegExp("\\[\\[" + parentOld + "\\]\\]", 'g'), parentNew);

                writeWikiContent(content, pagename);
            }

        },
        error: function(xhr) {
            //     alert( 'Error: Request failed.' );
        }
    });
}

function OnRightClickCategory(event, treeId, treeNode) {
    zTreeCategory.selectNode(treeNode);
    if (treeNode) {
        // pop-up menu
        $("#menuCategory").popupSmallMenu({
            event: event,
            onClickItem: function(item) {
                if (item == 'delete') {
                    //  removeTreeNodeCategory();
                } else if (item == 'jump') {
                    window.open(wgScriptPath + "/index.php/" + treeNode.name);
                } else if (item == 'add') {
                    dialogCategory.dialog("open");
                }
            }
        });
    }
}

function OnRightClickProperty(event, treeId, treeNode) {
    zTreeProperty.selectNode(treeNode);
    if (treeNode) {
        // pop-up menu
        $("#menuProperty").popupSmallMenu({
            event: event,
            onClickItem: function(item) {
                if (item == 'delete') {
                    //  removeTreeNodeProperty();
                } else if (item == 'jump') {
                    window.open(wgScriptPath + "/index.php/" + treeNode.name);
                } else if (item == 'add') {
                    dialogProperty.dialog("open");
                }
            }
        });
    }
}

function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type == "root") {
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
    } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
    }
    rMenu.css({
        "top": y + "px",
        "left": x + "px",
        "visibility": "visible"
    });

    $("body").bind("mousedown", onBodyMouseDown);
}

function hideRMenuCategory() {
    if (rMenuCategory) rMenu.css({
        "visibility": "hidden"
    });
    $("body").unbind("mousedown", onBodyMouseDown);
}

function hideRMenuProperty() {
    if (rMenuProperty) rMenu.css({
        "visibility": "hidden"
    });
    $("body").unbind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({
            "visibility": "hidden"
        });
    }
}

function addTreeNode() {
    dialog.dialog("open");
    hideRMenu();
}

function addCategory() {
    if ($("#nameCategory").val().length > 0) {
        var newNode = {
            name: $("#nameCategory").val(),
            icon: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
            iconOpen: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
            iconClose: '../extensions/SemanticHierarchy/includes/css/img/arrow_close.png'
        };
        if (newNode.name.indexOf('Category:') == -1) {
            newNode.name = 'Category:' + newNode.name;
        }
        if (zTreeCategory.getSelectedNodes()[0]) {
            newNode.checked = zTreeCategory.getSelectedNodes()[0].checked;
            zTreeCategory.addNodes(zTreeCategory.getSelectedNodes()[0], newNode);
            writeWikiContent('Automatically Created\n[[' + zTreeCategory.getSelectedNodes()[0].name + ']]', newNode.name);
        } else {
            zTreeCategory.addNodes(null, newNode);
            writeWikiContent('Automatically Created', newNode.name);
        }
    }
    $('#nameCategory').val('');
    dialogCategory.dialog("close");
}

function addProperty() {
    if ($("#nameProperty").val().length > 0) {
        var newNode = {
            name: $("#nameProperty").val(),
            icon: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
            iconOpen: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
            iconClose: '../extensions/SemanticHierarchy/includes/css/img/arrow_close.png'
        };
        if (newNode.name.indexOf('Property:') == -1) {
            newNode.name = 'Property:' + newNode.name;
        }
        if (zTreeProperty.getSelectedNodes()[0]) {
            newNode.checked = zTreeProperty.getSelectedNodes()[0].checked;
            zTreeProperty.addNodes(zTreeProperty.getSelectedNodes()[0], newNode);
            writeWikiContent('Automatically Created\n\nIs a Subproperty of [[Subproperty of::' + zTreeProperty.getSelectedNodes()[0].name.replace("Property:", "") + ']]', newNode.name);
        } else {
            zTreeProperty.addNodes(null, newNode);
            writeWikiContent('Automatically Created', newNode.name);
        }
    }
    $('#nameProperty').val('');
    dialogProperty.dialog("close");
}

function getEditToken() {
    return mw.user.tokens.get('editToken');
}

function writeWikiContent(content, wikipage) {
    //Schreibe den Content rein
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            format: 'json',
            action: 'edit',
            title: wikipage,
            text: content,
            token: getEditToken()
        },
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            if (data && data.edit && data.edit.result == 'Success') {
                //alert ('Ich bin in der Methode mit der ID ' + shapeId);
            } else if (data && data.error) {
                //alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
            } else {
                //alert( 'Error: Unknown result from API.' );
            }
        },
        error: function(xhr) {
            //alert( 'Error: Request failed.' );
        }
    });
}

function removeTreeNodeCategory() {
    hideRMenuCategory();
    var nodes = zTreeCategory.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "If you delete this node will be deleted along with sub-nodes. \n\nPlease confirm!";
            if (confirm(msg) == true) {
                zTreeCategory.removeNode(nodes[0]);
                removeNodeList(nodeList);
            }
        } else {
            zTreeCategory.removeNode(nodes[0]);
            deletePage(nodes[0].name);
        }
    }
}

function removeTreeNodeProperty() {
    hideRMenuProperty();
    var nodes = zTreeProperty.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "If you delete this node will be deleted along with sub-nodes. \n\nPlease confirm!";
            if (confirm(msg) == true) {
                zTreeProperty.removeNode(nodes[0]);
                removeNodeList(nodeList);
            }
        } else {
            zTreeProperty.removeNode(nodes[0]);
            deletePage(nodes[0].name);
        }
    }
}

function removeNodeList(nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
        deletePage(nodeList[i].name);
        removeNodeList(nodeList[i].children);
    }
}

function checkTreeNodeCategory(checked) {
    var nodes = zTreeCategory.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        zTreeCategory.checkNode(nodes[0], checked, true);
    }
    hideRMenuCategory();
}

function checkTreeNodeProperty(checked) {
    var nodes = zTreeProperty.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        zTreeProperty.checkNode(nodes[0], checked, true);
    }
    hideRMenuProperty();
}

function resetTree() {
    hideRMenu();
    $.fn.zTree.init($("#treeDemoCategory"), settingCategory, zNodesCategory);
    $.fn.zTree.init($("#treeDemoProperty"), settingProperty, zNodesProperty);
}

function initTreeCategory() {
    $.fn.zTree.init($("#treeDemoCategory"), settingCategory, zNodesCategory);
    zTreeCategory = $.fn.zTree.getZTreeObj("treeDemoCategory");
    rMenuCategory = $("#rMenuCategory");
    zTreeCategory.setting.edit.drag.prev = false
    zTreeCategory.setting.edit.drag.inner = true
    zTreeCategory.setting.edit.drag.next = false
    zTreeCategory.setting.edit.drag.isCopy = false
    zTreeCategory.setting.edit.drag.isMove = true


    dialogCategory = $("#dialog-formCategory").dialog({
        autoOpen: false,
        height: 300,
        width: 400,
        modal: true,
        buttons: {
            "Create": addCategory,
            Cancel: function() {
                $('#nameCategory').val('');
                dialogCategory.dialog("close");
            }
        },
        close: function() {
            form[0].reset();
        }
    });

    form = dialogCategory.find("form").on("submit", function(event) {
        event.preventDefault();
        addCategory();
    });
}

function initTreeProperty() {
    $.fn.zTree.init($("#treeDemoProperty"), settingProperty, zNodesProperty);
    zTreeProperty = $.fn.zTree.getZTreeObj("treeDemoProperty");
    rMenuProperty = $("#rMenuProperty");
    zTreeProperty.setting.edit.drag.prev = false
    zTreeProperty.setting.edit.drag.inner = true
    zTreeProperty.setting.edit.drag.next = false
    zTreeProperty.setting.edit.drag.isCopy = false
    zTreeProperty.setting.edit.drag.isMove = true


    dialogProperty = $("#dialog-formProperty").dialog({
        autoOpen: false,
        height: 300,
        width: 400,
        modal: true,
        buttons: {
            "Create": addProperty,
            Cancel: function() {
                $('#nameProperty').val('');
                dialogProperty.dialog("close");
            }
        },
        close: function() {
            form[0].reset();
        }
    });

    form = dialogProperty.find("form").on("submit", function(event) {
        event.preventDefault();
        addProperty();
    });
}

function deletePage(pagename) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            action: 'delete',
            title: pagename,
            format: 'json',
            token: getEditToken()
        },
        type: 'POST',
        success: function(data) {
            if (data && data.edit && data.edit.result == 'Success') {

            } else if (data && data.error) {

            } else {

            }
        }
    });
}

function getNodefromzTree(label, list) {
    var result = null;
    for (var i = 0; i < list.length; i++) {
        if (list[i].name == label) {
            //Hab dich
            result = list[i];
            break;
        }
        if (list[i].children.length > 0) {
            result = getNodefromzTree(label, list[i].children);
            if (result != null) {
                break;
            }
        }
    }

    return result;
}

function askForSubcategories(node) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            action: 'ask',
            query: '[[Subcategory of::' + node.name + ']]',
            format: 'json'

        },
        type: 'GET',
        async: false,
        success: function(data) {
            if (data && data.edit && data.edit.result == 'Success') {

            } else if (data && data.error) {
                alert(data);
            } else {
                var t = data.query.results;
                var res = getNodefromzTree(node.name, zNodesCategory);
                if (res != null) {
                    node = res;
                }
                Object.keys(t).forEach(function(key) {
                    var child = {
                        name: t[key].fulltext,
                        open: true,
                        icon: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
                        iconOpen: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
                        iconClose: '../extensions/SemanticHierarchy/includes/css/img/arrow_close.png',
                        children: []
                    };
                    deleteDuplicate(child, zNodesCategory);
                    node.children.push(child);
                    //Wenn es schon existiert, dann müssen wir dessen Kinder übernehmen und den Knoten selbst löschen

                });
                if (res != null) {

                } else {
                    zNodesCategory.push(node);
                }

            }
        }
    });
}

function askForSubproperties(node) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            action: 'ask',
            query: '[[Subproperty of::' + node.name + ']]',
            format: 'json'

        },
        type: 'GET',
        async: false,
        success: function(data) {
            if (data && data.edit && data.edit.result == 'Success') {

            } else if (data && data.error) {
                alert(data);
            } else {
                var t = data.query.results;
                var res = getNodefromzTree(node.name, zNodesProperty);
                if (res != null) {
                    node = res;
                }
                Object.keys(t).forEach(function(key) {
                    var child = {
                        name: t[key].fulltext,
                        open: true,
                        icon: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
                        iconOpen: '../extensions/SemanticHierarchy/includes/css/img/arrow_open.png',
                        iconClose: '../extensions/SemanticHierarchy/includes/css/img/arrow_close.png',
                        children: []
                    };
                    deleteDuplicate(child, zNodesProperty);
                    node.children.push(child);
                    //Wenn es schon existiert, dann müssen wir dessen Kinder übernehmen und den Knoten selbst löschen

                });
                if (res != null) {

                } else {
                    zNodesProperty.push(node);
                }

            }
        }
    });
}

function deleteDuplicate(node, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].name == node.name) {
            //Hab dich
            for (var j = 0; j < list[i].children.length; j++) {
                node.children.push(list[i].children[j]);
            }
            list.splice(i, 1);
        } else if (list[i].children.length > 0) {
            deleteDuplicate(node, list[i].children);
        }
    }
}

/**
 * @description
 * 		small popup menu.
 * @deprecated
 * 		JQuery.js
 * @author Malt
 * @version 1.0
 * Date: 2013-05-22
 */
$(window).load(function() {
    $.fn.popupSmallMenu = function(options) {
        var $currMenu = $(this),
            defaultOptions = {
                event: null,
                onClickItem: null
            },
            options = $.extend(defaultOptions, options);

        var _smallMenu = {
            popupSmallMenu: function() {
                this._bindItemClick();
                this._bindMenuEvent();
                this._showMenu();
                return $currMenu;
            },
            _bindMenuEvent: function() {
                var thiz = this;
                document.onclick = function() {
                        thiz._unBindItemClick();
                        $currMenu.hide();
                    }
                    /*$currMenu.hover(function(){
				},function(){
					thiz._unBindItemClick();
					$currMenu.hide();
				}); */

                $currMenu.click(function() {
                    thiz._unBindItemClick();
                    $currMenu.hide();
                });
            },
            _showMenu: function() {
                if (!options.event) {
                    alert('  please incoming mouse events  ');
                }
                $currMenu.css({
                    top: options.event.clientY + "px",
                    left: options.event.clientX + "px",
                    display: "block"
                });
            },
            _bindItemClick: function() {
                $currMenu.find('li').each(function(index, obj) {
                    var $li = $(obj);
                    var itemIden = $li.attr('class');
                    $li.bind('click', function(event) {
                        event.stopPropagation();
                        if (options.onClickItem && typeof options.onClickItem === 'function') {
                            options.onClickItem(itemIden);
                        }
                    });
                });
            },
            _unBindItemClick: function() {
                $currMenu.find('li').each(function(index, obj) {
                    $(obj).unbind();
                });
            }
        };

        return _smallMenu.popupSmallMenu();
    }
});
