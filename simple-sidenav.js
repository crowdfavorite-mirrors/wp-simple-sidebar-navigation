// Update hidden field with navigation links values
			function _encode(str) {
				var newstr = base64_encode(str);
				return newstr;
			}
			function update_navlinks(num) {
				var navlinks_arr = new Array();
				var opt = document.getElementById("simple_sidenav_navlinks_" + num).getElementsByTagName("option");
				var link_ids = new Array();
				if(opt.length != 0){
					for(var i=0; i<opt.length; i++) {
						//navlinks_arr[i] = opt[i].value;
						var tmp_arr = new Array();
						var value = opt[i].value;
						value = value.replace("'", "&#39;");
						tmp_arr = unserialize(value);
						navlinks_arr.push(tmp_arr);
						link_ids.push(tmp_arr["linkid"]);
					}
				}
				var arr = jQuery.makeArray(navlinks_arr);
				//var str = navlinks_arr.join("|||");
				var str = serialize(navlinks_arr);
				jQuery("input#simple_sidenav_tmp_"+num).val(str);
				//var linkid = jQuery("input#simple_sidenav_nextlinkid_"+num).val();
				rsort(link_ids, 'SORT_NUMERIC');
				//var nextlinkid = parseInt(max(link_ids));
				if(link_ids[0]){
					var nextlinkid = parseInt(link_ids[0], 10)+1;
				}else{
					var nextlinkid = 1;
				}
				jQuery("input#simple_sidenav_nextlinkid_"+num).val(nextlinkid);
				return false;
			}
			
			// Add custom link to the list
    		function sn_add_custom(id){			
				//jQuery('input[id^="simple_sidenav_add_custom_"]').click(function(event) {
				//var num_id = jQuery(this).attr("id");
				var num_id = id;
				var num = num_id.replace("simple_sidenav_add_custom_", "");
				var sidenav_linktitle = jQuery("input#simple_sidenav_linktitle_" + num).val();
				sidenav_linktitle = sidenav_linktitle.replace("'", "&#39;");
				var sidenav_linkurl = jQuery("input#simple_sidenav_linkurl_" + num).val();
				
				var nav_linkid = jQuery("input#simple_sidenav_nextlinkid_" + num).val();
				
				if(jQuery("#simple_sidenav_linktarget_" + num).length > 0){
					var sidenav_linktarget = jQuery("#simple_sidenav_linktarget_" + num + " option:selected").val();
				}else{
					var sidenav_linktarget = ''; 
				}
				
				if(sidenav_linktitle.length == 0 || sidenav_linkurl == "http://" || sidenav_linkurl.length == 0){
				  	if(sidenav_linktitle.length == 0){
						alert("Custom Link Title can not be empty.");
					}else{
						alert("Link URL can not be empty.");
					}
				}else{
					
					var nav_data = {custom : sidenav_linkurl, title: _encode(sidenav_linktitle), target: sidenav_linktarget, linkid: nav_linkid, depth: 0};
					//jQuery("select#simple_sidenav_navlinks_" + num).append("<option value=\"custom||" + sidenav_linktitle + "||" + sidenav_linkurl + "\">"+ sidenav_linktitle + " - " + sidenav_linkurl +"</option>");
					jQuery("select#simple_sidenav_navlinks_" + num).append("<option value=\'" + serialize(nav_data) + "\'>"+ sidenav_linktitle + " - " + sidenav_linkurl +"</option>");
					update_navlinks(num);
				}
				//return false;
				//});
			}
			
			
			function sn_add_page(id){
			// Add selected link from the pages list to the navigation list
    //		jQuery('input[id^="simple_sidenav_add_page_"]').click(function() {
				//jQuery(this).css("border", "1px solid red");
				//var num_id = jQuery(this).attr("id");
				var num_id = id;
				var num = num_id.replace("simple_sidenav_add_page_", "");
				nav_linktitle = jQuery("#simple_sidenav_page_id_" + num + " option:selected").text();
				var nav_page_id = jQuery("#simple_sidenav_page_id_" + num + " option:selected").val();
				var nav_linktitle = jQuery.trim(nav_linktitle);								
				var nav_linkid = jQuery("input#simple_sidenav_nextlinkid_" + num).val();
				
				if(nav_linktitle.length == 0){
					alert("Select an existing page to add to the navigation sidebar");
				}else{
					var nav_data = {page : nav_page_id, title: _encode(nav_linktitle), linkid: nav_linkid, depth: 0};
					var sidenav_pageid = jQuery("#simple_sidenav_page_id_" + num + " option:selected").val();
					//jQuery("#simple_sidenav_navlinks_" + num).append("<option value=\"page||" + nav_page_id + "\">"+ nav_linktitle + "</option>");
					jQuery("#simple_sidenav_navlinks_" + num).append("<option value=\'" + serialize(nav_data) + "\'>"+ nav_linktitle + "</option>");
					update_navlinks(num);
				}
				return false;
			//});
			}
			
			function sn_link_depth(serialized_data){
				var arr = unserialize(serialized_data);
				var depth = parseInt(arr["depth"])+1;
				if(!depth){ var depth = 0; }
				return depth;
			}
			
			function _indented(depth){
				var depth = parseInt(depth);
					var spaces = "";
					for(var i=1; i<=depth; i++){
						spaces += "&nbsp;&nbsp;&nbsp;";
					}
					return spaces;

			}
			
			function sn_add_child_page(id){
			// Add selected link from the pages list to the navigation list
    //		jQuery('input[id^="simple_sidenav_add_page_"]').click(function() {
				//jQuery(this).css("border", "1px solid red");
				//var num_id = jQuery(this).attr("id");
				var num_id = id;
				var num = num_id.replace("simple_sidenav_add_child_page_", "");
				nav_linktitle = jQuery("#simple_sidenav_page_id_" + num + " option:selected").text();
				var nav_page_id = jQuery("#simple_sidenav_page_id_" + num + " option:selected").val();
				var nav_linktitle = jQuery.trim(nav_linktitle);								
				var nav_linkid = jQuery("input#simple_sidenav_nextlinkid_" + num).val();
				var parent_data = jQuery("select#simple_sidenav_navlinks_" + num + " option:selected").val();
				
				if(!parent_data){
					alert("Select the parent page from the Sidebar Navigation Links field.");
				}else if(nav_linktitle.length == 0){
					alert("Select an existing page to add to the navigation sidebar");
				}else{
					var arr = unserialize(parent_data);
					var nav_parentid = arr["linkid"];
					var nav_depth = sn_link_depth(parent_data);
					var nav_data = {page : nav_page_id, title: _encode(nav_linktitle), linkid: nav_linkid, parentid: nav_parentid, depth: nav_depth};
					var sidenav_pageid = jQuery("#simple_sidenav_page_id_" + num + " option:selected").val();
					//jQuery("#simple_sidenav_navlinks_" + num).append("<option value=\"page||" + nav_page_id + "\">"+ nav_linktitle + "</option>");
					jQuery("#simple_sidenav_navlinks_" + num + " option:selected").after("<option value=\'" + serialize(nav_data) + "\'>"+ _indented(nav_depth) + nav_linktitle + "</option>");
					update_navlinks(num);
				}
				return false;
			//});
			}
			
			function sn_add_child_custom(id){			
				//jQuery('input[id^="simple_sidenav_add_custom_"]').click(function(event) {
				//var num_id = jQuery(this).attr("id");
				var num_id = id;
				var num = num_id.replace("simple_sidenav_add_child_custom_", "");
				var sidenav_linktitle = jQuery("input#simple_sidenav_linktitle_" + num).val();
				var sidenav_linkurl = jQuery("input#simple_sidenav_linkurl_" + num).val();
				var nav_linkid = jQuery("input#simple_sidenav_nextlinkid_" + num).val();
				var parent_data = jQuery("select#simple_sidenav_navlinks_" + num + " option:selected").val();
				
				if(jQuery("#simple_sidenav_linktarget_" + num).length > 0){
					var sidenav_linktarget = jQuery("#simple_sidenav_linktarget_" + num + " option:selected").val();
				}else{
					var sidenav_linktarget = ''; 
				}
				
				if(!parent_data){
					alert("Select the parent page from the Sidebar Navigation Links field.");
				}else if(sidenav_linktitle.length == 0 || sidenav_linkurl == "http://" || sidenav_linkurl.length == 0){
				  	if(sidenav_linktitle.length == 0){
						alert("Custom Link Title can not be empty.");
					}else{
						alert("Link URL can not be empty.");
					}
				}else{
					var arr = unserialize(parent_data);
					var nav_parentid = arr["linkid"];
					var nav_depth = sn_link_depth(parent_data);
					var nav_data = {custom : sidenav_linkurl, title: _encode(sidenav_linktitle), target: sidenav_linktarget, linkid: nav_linkid, parentid: nav_parentid, depth: nav_depth};
					//jQuery("select#simple_sidenav_navlinks_" + num).append("<option value=\"custom||" + sidenav_linktitle + "||" + sidenav_linkurl + "\">"+ sidenav_linktitle + " - " + sidenav_linkurl +"</option>");
					jQuery("select#simple_sidenav_navlinks_" + num + " option:selected").after("<option value=\'" + serialize(nav_data) + "\'>"+ _indented(nav_depth) + sidenav_linktitle + " - " + sidenav_linkurl +"</option>");
					update_navlinks(num);
				}
				//return false;
				//});
			}
			
			function sn_move_up(id){		  
			// Move navigation item up the list
			//jQuery('input[id^="simple_sidenav_move_up_"]').click(function() {
				//var num_id = jQuery(this).attr("id");
				var num_id = id;
				var num = num_id.replace("simple_sidenav_move_up_", "");			
        		var curr = jQuery("select#simple_sidenav_navlinks_" + num + " option:selected");
		        var prev = jQuery(curr).prev();

		        // swap
		        jQuery(prev).insertAfter(curr);
				update_navlinks(num);

			//});
			}
			
			function sn_move_down(id){
			// Move navigation item down the list
			//jQuery('input[id^="simple_sidenav_move_down_"]').click(function() {
				//var num_id = jQuery(this).attr("id");
				var num_id = id;
				var num = num_id.replace("simple_sidenav_move_down_", "");			
        		var curr = jQuery("select#simple_sidenav_navlinks_" + num + " option:selected");
		        var next = jQuery(curr).next();

		        // swap

		        jQuery(next).insertBefore(curr);
				update_navlinks(num);
			//});
			}
			
			
			function sn_remove(id){
			// Remove navigation item from the list
			//jQuery('input[id^="simple_sidenav_remove_"]').click(function() {
			    var num_id = id;
			    //var num_id = jQuery(this).attr("id");
				var num = num_id.replace("simple_sidenav_remove_", "");			
				jQuery("select#simple_sidenav_navlinks_" + num + " option:selected").remove();
				update_navlinks(num);
				return false;
    		//} );
			}
			
			function sn_delete_all(id){
			    var num_id = id;
				var num = num_id.replace("simple_sidenav_delete_all_", "");			
				jQuery("select#simple_sidenav_navlinks_" + num + " option").remove();
				update_navlinks(num);
				return false;
			}
			
			function sn_hint(id){
			// Show URL of the selected page
			//jQuery('select[id^="simple_sidenav_navlinks_"]').change(function() {
			    //var num_id = jQuery(this).attr("id");
				var num_id = id;
				var num = num_id.replace("simple_sidenav_navlinks_", "");			
				var link = jQuery("select#simple_sidenav_navlinks_" + num + " option:selected").text();
				jQuery("p#p_id_" + num).text(link);
    		//} ).change();
			}
						
		jQuery(document).ready(function(){
			jQuery('input[id^="simple_sidenav_add_custom_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_add_custom(id);
			});
			
			jQuery('input[id^="simple_sidenav_add_child_custom_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_add_child_custom(id);
			});
			
			jQuery('input[id^="simple_sidenav_add_page_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_add_page(id);
			});
					
			jQuery('input[id^="simple_sidenav_add_child_page_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_add_child_page(id);
			});

			jQuery('input[id^="simple_sidenav_move_up_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_move_up(id);
			});			

			jQuery('input[id^="simple_sidenav_move_down_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_move_down(id);
			});	

			jQuery('input[id^="simple_sidenav_remove_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_remove(id);
			});	
			
			
			jQuery('a[id^="simple_sidenav_delete_all_"]').livequery("click", function(){
				var id = jQuery(this).attr("id");
				sn_delete_all(id);
			});	
		
			
			jQuery('select[id^="simple_sidenav_navlinks_"]').livequery("change", function(){
				var id = jQuery(this).attr("id");
				sn_hint(id);
			}).change();	
		
			
		});