<?php
/**
 * SpecialPage for SemanticHierarchy extension
 *
 * @file
 * @ingroup Extensions
 */

class SemanticHierarchySpecial extends SpecialPage {
	public function __construct() {
		parent::__construct( 'SemanticHierarchy', 'editinterface' );
	}


	/**
     * Override the parent to set where the special page appears on Special:SpecialPages
     * 'other' is the default. If that's what you want, you do not need to override.
     * Specify 'media' to use the <code>specialpages-group-media</code> system interface message, which translates to 'Media reports and uploads' in English;
     * 
     * @return string
     */
    function getGroupName() {
        return 'smw_group';
    }


	/**
	 * Show the page to the user
	 *
	 * @param string $sub The subpage string argument (if any).
	 *  [[Special:HelloWorld/subpage]].
	 */
	public function execute( $sub ) {

		$out = $this->getOutput();

		$out->setPageTitle( $this->msg( 'sh-special-title' ) );

	//	$out->addWikiMsg( 'annotator-special-intro' );

      //  $out->addWikiText( '== '.$this->msg( 'category-pageform-assignment' ).' ==' );
        $out->addWikiMsg( 'sh-special-page-description' );
     	$out->addHTML( "</br>
    <div id='loader-wrapper'>
      <div id='loader'></div>
    </div>
<table border='0' style='width:100%'>
<tr><td><b>".$this->msg( 'sh-category-table-header' )."</b></td><td><b>".$this->msg( 'sh-property-table-header' )."</b></td></tr>
  <tr>
    <td><div class='content_wrap'>
  <div class='zTreeDemoBackground left'>
    <ul id='treeCategory' class='ztree'></ul>
  </div>
</div></td>
<td><div class='content_wrap'>
  <div class='zTreeDemoBackground left'>
    <ul id='treeProperty' class='ztree'></ul>
  </div>
</div>
</td>
  </tr>
</table>" );

$out->addHTML( "
<ul id='menuCategory'  class='small-menu'>

<!-- <li class='edit'><a href='#'> editing </a></li> -->

<li class='add'><a href='#'> ".$this->msg( 'sh-context-add-node' )." </a></li>

<li class='jump'><a href='#'> ".$this->msg( 'sh-context-jump-to-page' )." </a></li>

<li class='delete'><a href='#'> ".$this->msg( 'sh-context-delete-node' )." </a></li>

<!-- <li class='small-menu-separator'></li> -->

<!-- <li class='delete'><a href='#'><span class='icon icon-edit'></span>Zoom Out</a></li> -->

</ul>");

        $out->addModules( 'ext.semanticHierarchy.special' );
	}
}
