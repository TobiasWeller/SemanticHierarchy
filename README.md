<img src="https://user-images.githubusercontent.com/11618221/27001938-cbf4bff0-4dd5-11e7-8182-dc6ac23bc3c1.png" alt="Semantic Hierarchy" title="Semantic Hierarchy" align="middle" height="400"/>


Semantic Hierarchy
======================

The repository contains the Semantic Hierarchy extension for Semantic MediaWiki. The extension provides a plugin for capturing Text Annotations of wiki articles.

<!--Click [here](https://sandbox.semantic-mediawiki.org/wiki/HaloTestEvent) for a Demo. -->

## Table of content
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Semantic Hierarchy Setup](#semantic-hierarchy-setup)
- [Usage](#usage)
    - [Create Categories and Properties](#create-categories-and-properties)
    - [Edit Categories and Properties](#edit-categories-and-properties)
    - [Delete Categories and Properties](#delete-categories-and-properties)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Links](#links)


## Prerequisites
* [MediaWiki](http://mediawiki.org) must be installed
* [Semantic MediaWiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) must be installed


## Installation
* Download and extract the repository
* Place the extracted folder in your extension folder of MediaWiki
* Add the following code at the bottom of your LocalSettings.php:</br>
```wfLoadExtension( 'SemanticHierarchy' );```
* To users running MediaWiki 1.24 or earlier: Add the folloding at the bottom of your LocalSettings.php:</br>
```require_once "$IP/extensions/SemanticHierarchy/SemanticHierarchy.php";```

## Semantic Hierarchy Setup
* Go to Special Pages and Click on *Semantic Hierarchy* under the Group *Semantic MediaWiki*
     * *Remark: Only Users with sysops rights are allowed to access the page.*


## Usage

### Create Categories and Properties
* Mark and right click on the corresponding Category/Property, for which you would like to create a subcategory/subproperty. A Context Menu appears.
* Click on Add.
* A Form appears, which allows for adding a new Node Name.
* Click on Submit
* The new node appears in the tree and a corresponding wiki page is create</br>
![Context Menu](https://user-images.githubusercontent.com/11618221/27001931-96607956-4dd5-11e7-80ca-084495928e14.png)</br></br>
![Form](https://user-images.githubusercontent.com/11618221/27001930-965c95a2-4dd5-11e7-9dd3-5f39fc1ee126.png)


### Edit Categories and Properties
* Drag & Drop the Category/Property to the desired position in order to change the Hierarchy of Properties/Categories.
* Drag & Drop of a Category to the Property tree and vice versa is not possible.


### Delete Categories and Properties
* Mark and right click on the corresponding Category/Property, which you would like to delete. A Context Menu appears.
* Click on Delete.
* The corresponding Wiki Page will be deleted and the node dissapears in the tree.


## License
The Semantic Hierarchy is currently under the MIT License.


## Acknowledgements
For the Semantic Hierarchy is the JS Library [zTree](http://www.treejs.cn) used.


## Links

* [MediaWiki Extension Page](https://www.mediawiki.org/wiki/Extension:Semantic_Hierarchy)
* [AIFB](http://www.aifb.kit.edu/web/Semantic_Hierarchy)
