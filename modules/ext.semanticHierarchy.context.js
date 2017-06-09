/**
 * Context Menu
 * Author: Tobias Weller
 */
function onRightClickTree(event, treeId, treeNode) {
    zTreeCategory.selectNode(treeNode);
    if (treeNode) {
        // pop-up menu
        $("#menuCategory").popupSmallMenu({
            event: event,
            onClickItem: function(item) {
                if (item == 'delete') {
                    //  removeTreeNodeCategory();
                } else if (item == 'jump') {
                    window.open(mw.config.get('wgScriptPath') + "/index.php/" + treeNode.name);
                } else if (item == 'add') {
                    if (treeId == "treeCategory") {
                        dialog(treeNode, 'Category');
                    } else if (treeId == "treeProperty") {
                        dialog(treeNode, 'Property');
                    }

                }
            }
        });
    }
}

function dialog(item, type) {
    swal({
        title: 'Enter new ' + type,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: function(pagename) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    if (pagename.length == 0) {
                        reject(mw.msg('sh-reject-message'));
                    } else {
                        resolve()
                    }
                }, 500)
            })
        },
        allowOutsideClick: false
    }).then(function(pagename) {
        if (pagename.toLowerCase().indexOf(type.toLowerCase() + ':') !== 0) {
            pagename = type + ':' + pagename;
        }
        if (type == 'Category') {
            var content = mw.msg('sh-category-content');
            content += '\n\n [[' + item.name + ']]'
        } else if (type == 'Property') {
            var content = mw.msg('sh-property-content');
            content += '\n\n [[Subproperty of::' + item.name + ']]';

        }
        addNode(pagename, type, content);
    })
}

function addNode(pagename, type, content) {
    var newNode = {
        name: pagename,
        icon: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
        iconOpen: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_open.png',
        iconClose: '../extensions/SemanticHierarchy/modules/lib/css/img/arrow_close.png',
        children: []
    };
    if (type == 'Category') {
        if (zTreeCategory.getSelectedNodes()[0]) {
            newNode.checked = zTreeCategory.getSelectedNodes()[0].checked;
            zTreeCategory.addNodes(zTreeCategory.getSelectedNodes()[0], newNode);
            api.createPage(pagename,content, function(){});
        } else {
            zTreeCategory.addNodes(null, newNode);
            api.createPage(pagename,content, function(){});
        }
    } else if (type == 'Property') {
        if (zTreeProperty.getSelectedNodes()[0]) {
            newNode.checked = zTreeProperty.getSelectedNodes()[0].checked;
            zTreeProperty.addNodes(zTreeProperty.getSelectedNodes()[0], newNode);
            api.createPage(pagename,content, function(){});
        } else {
            zTreeProperty.addNodes(null, newNode);
        }
    }
}