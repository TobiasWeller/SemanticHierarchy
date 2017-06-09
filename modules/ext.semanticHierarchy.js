/**
 * Annotator Extension Main Script
 * Author: DominikMartin, BenjaminHosenfeld
 */
//mw.notify( $('<span>Hallo ' + mw.user.getName() + ',<br>Sie können Annotator nun benutzen indem Sie auf '+mw.msg('annotate-button-text')+' klicken...</span>') );

// flag representing the status of annotator mode


(function() {
    $('body').append('<div class="annotator-loading"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
    // append annotate button and status to menu
    /*  if (mw.config.get('wgTitle').split('.').pop() == 'pdf' && mw.config.get('wgAction') == 'view') {

            $('#p-views>ul').append('<li id="ca-annotate"><span><a href="#" title="'+mw.msg('annotate-button-desc')+'" accesskey="a">'+mw.msg('annotate-button-text')+'</a><i class="fa fa-check" aria-hidden="true"></i></span></li>');

            // do if annotate button is clicked
            $('#ca-annotate').click(function() {
                $('body').append('<div class="annotator-loading"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
                loaded = !loaded;

                if(loaded){
                    mw.loader.using( 'ext.annotator.module' ).then( function () {
                        $( '#ca-annotate' ).addClass( 'selected' );
                        // if module is loaded message will pop up
                        mw.notify( mw.message('annotate-welcome-message') );
                    } );
                }else{
                    //$('#content').annotator('destroy');
                    $( '#ca-annotate' ).removeClass( 'selected' );
                    mw.notify( mw.message('annotate-godbye-message') );
                    location.reload();
                }

        });
        } */
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

    api.getAllCategories(function(categories) {
        categories.forEach(function(category, idx, categories) {
            var node = {
                name: category.title,
                open: true,
                icon: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                iconOpen: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                iconClose: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_close.png',
                children: []
            };
            api.subcategories(node.name, function(subcategories) {
                var res = getNodefromzTree(node.name, zNodesCategory);
                if (res != null) {
                    node = res;
                }
                Object.keys(subcategories).forEach(function(key) {
                    var child = {
                        name: subcategories[key].fulltext,
                        open: true,
                        icon: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                        iconOpen: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                        iconClose: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_close.png',
                        children: []
                    };
                    deleteDuplicate(child, zNodesCategory);
                    node.children.push(child);
                });
                if (idx === categories.length - 1) {
                    categoriesLoaded = true;
                    console.log("Loaded all Categories");
                }
                if (res != null) {

                } else {
                    zNodesCategory.push(node);
                    initTreeCategory();
                }

            });

        });
    });

    api.getAllProperties(function(properties) {
        properties.forEach(function(property, idx, properties) {
            var node = {
                name: property.title,
                open: true,
                icon: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                iconOpen: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                iconClose: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_close.png',
                children: []
            };
            api.subproperties(node.name, function(subproperties) {
                var res = getNodefromzTree(node.name, zNodesProperty);
                if (res != null) {
                    node = res;
                }
                Object.keys(subproperties).forEach(function(key) {
                    var child = {
                        name: subproperties[key].fulltext,
                        open: true,
                        icon: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                        iconOpen: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
                        iconClose: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_close.png',
                        children: []
                    };
                    deleteDuplicate(child, zNodesProperty);
                    node.children.push(child);
                });
                if (idx === properties.length - 1) {
                    propertiesLoaded = true;
                    console.log("Loaded all Properties");
                }
                if (res != null) {

                } else {
                    zNodesProperty.push(node);
                    initTreeProperty();
                }

            });

        });
    });

}());

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

function initTreeCategory() {
    $.fn.zTree.init($("#treeCategory"), settingCategory, zNodesCategory);
    zTreeCategory = $.fn.zTree.getZTreeObj("treeCategory");
    zTreeCategory.setting.edit.drag.prev = false;
    zTreeCategory.setting.edit.drag.inner = true;
    zTreeCategory.setting.edit.drag.next = false;
    zTreeCategory.setting.edit.drag.isCopy = false;
    zTreeCategory.setting.edit.drag.isMove = true;

    if (propertiesLoaded && categoriesLoaded) {
        $('.annotator-loading').hide();
    }
}


function initTreeProperty() {
    $.fn.zTree.init($("#treeProperty"), settingProperty, zNodesProperty);
    zTreeProperty = $.fn.zTree.getZTreeObj("treeProperty");
    zTreeProperty.setting.edit.drag.prev = false;
    zTreeProperty.setting.edit.drag.inner = true;
    zTreeProperty.setting.edit.drag.next = false;
    zTreeProperty.setting.edit.drag.isCopy = false;
    zTreeProperty.setting.edit.drag.isMove = true;

    if (propertiesLoaded && categoriesLoaded) {
        $('.annotator-loading').hide();
    }
}

function myOnDrop(event, treeId, treeNodes, targetNode, moveType) {
    for (var i = 0; i < treeNodes.length; i++) {
        //Auf den Treenode pages die Categor[[]] löschen und ersetzen durch den targetNode
        //Suche Vater
        var pagename = treeNodes[i].name;
        api.getPageContent(pagename, function(content) {
            if (previousFatherNode == null) {
                //Hatte keinen Vater Knoten bisher
                if (isCategory(pagename)) {
                	content = content + "\n[[" + targetNode.name + "]]";
                } else {
                	content = content + "\n[[Subproperty of::" + targetNode.name + "]]";
                }
                api.createPage(pagename, content, function(){});

            } else {
                if (targetNode == null) {
                    //Ist Root Knoten, hat also keine Category mehr, alle bisherigen löschen
                    if (isCategory(pagename)) {
                    	content = content.replace(new RegExp("\\[\\[.*\\]\\]", 'g'), "");
                    } else {
                    	content = content.replace(new RegExp("\\[\\[Subproperty of::.*\\]\\]", 'g'), "");
                    }                    
                    api.createPage(pagename, content, function(){});
                } else {
                	if (isCategory(pagename)) {
                    	content = content.replace(new RegExp("\\[\\[" + previousFatherNode + "\\]\\]", 'g'), "[[" + targetNode.name + "]]");
                    } else {
                    	content = content.replace(new RegExp("\\[\\[Subproperty of::" + previousFatherNode + "\\]\\]", 'g'), "[[Subproperty of::" + targetNode.name + "]]");
                    }
                    api.createPage(pagename, content, function(){});
                }

            }
            previousFatherNode = '';
        });
    }
}

function myBeforeDrop(targetTreeId, treeNodes, targetNode, moveType) {
    if (targetTreeId != ('tree' + treeNodes[0].name.split(':')[0])) {
        return false;
    } else {
        previousFatherNode = treeNodes[0].getParentNode();
        if (previousFatherNode != null) {
            previousFatherNode = previousFatherNode.name;
        }
    }
}

function isCategory(pagename) {
	if (pagename.split(":")[0] == 'Category') {
		return true;
    } else {
    	return false;
    }
}