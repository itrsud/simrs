// JavaScript Document<script type="text/javascript">
 var detailview = $.extend({}, $.fn.datagrid.defaults.view, {
	render: function(target, container, frozen){
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		if (frozen){
			if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))){
				return;
			}
		}
		
		var rows = state.data.rows;
		var fields = $(target).datagrid('getColumnFields', frozen);
		var table = [];
		table.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
		for(var i=0; i<rows.length; i++) {
			// get the class and style attributes for this row
			var css = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : '';
			var classValue = '';
			var styleValue = '';
			if (typeof css == 'string'){
				styleValue = css;
			} else if (css){
				classValue = css['class'] || '';
				styleValue = css['style'] || '';
			}
			
			var cls = 'class="datagrid-row ' + (i % 2 && opts.striped ? 'datagrid-row-alt ' : ' ') + classValue + '"';
			var style = styleValue ? 'style="' + styleValue + '"' : '';
			var rowId = state.rowIdPrefix + '-' + (frozen?1:2) + '-' + i;
			table.push('<tr id="' + rowId + '" datagrid-row-index="' + i + '" ' + cls + ' ' + style + '>');
			table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
			table.push('</tr>');
			
			table.push('<tr style="display:none;">');
			if (frozen){
				table.push('<td colspan=' + (fields.length+2) + ' style="border-right:0">');
			} else {
				table.push('<td colspan=' + (fields.length) + '>');
			}
			table.push('<div class="datagrid-row-detail">');
			if (frozen){
				table.push('&nbsp;');
			} else {
				table.push(opts.detailFormatter.call(target, i, rows[i]));
			}
			table.push('</div>');
			table.push('</td>');
			table.push('</tr>');
			
		}
		table.push('</tbody></table>');
		
		$(container).html(table.join(''));
	},
	
	renderRow: function(target, fields, frozen, rowIndex, rowData){
		var opts = $.data(target, 'datagrid').options;
		
		var cc = [];
		if (frozen && opts.rownumbers){
			var rownumber = rowIndex + 1;
			if (opts.pagination){
				rownumber += (opts.pageNumber-1)*opts.pageSize;
			}
			cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">'+rownumber+'</div></td>');
		}
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var col = $(target).datagrid('getColumnOption', field);
			if (col){
				var value = rowData[field];	// the field value
				var css = col.styler ? (col.styler(value, rowData, rowIndex)||'') : '';
				var classValue = '';
				var styleValue = '';
				if (typeof css == 'string'){
					styleValue = css;
				} else if (cc){
					classValue = css['class'] || '';
					styleValue = css['style'] || '';
				}
				var cls = classValue ? 'class="' + classValue + '"' : '';
				var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');
				
				cc.push('<td field="' + field + '" ' + cls + ' ' + style + '>');
				
				if (col.checkbox){
					style = '';
				} else if (col.expander){
					style = "text-align:center;height:16px;";
				} else {
					style = styleValue;
					if (col.align){style += ';text-align:' + col.align + ';'}
					if (!opts.nowrap){
						style += ';white-space:normal;height:auto;';
					} else if (opts.autoRowHeight){
						style += ';height:auto;';
					}
				}
				
				cc.push('<div style="' + style + '" ');
				if (col.checkbox){
					cc.push('class="datagrid-cell-check ');
				} else {
					cc.push('class="datagrid-cell ' + col.cellClass);
				}
				cc.push('">');
				
				if (col.checkbox){
					cc.push('<input type="checkbox" name="' + field + '" value="' + (value!=undefined ? value : '') + '">');
				} else if (col.expander) {
					//cc.push('<div style="text-align:center;width:16px;height:16px;">');
					cc.push('<span class="datagrid-row-expander datagrid-row-expand" style="display:inline-block;width:16px;height:16px;cursor:pointer;" />');
					//cc.push('</div>');
				} else if (col.formatter){
					cc.push(col.formatter(value, rowData, rowIndex));
				} else {
					cc.push(value);
				}
				
				cc.push('</div>');
				cc.push('</td>');
			}
		}
		return cc.join('');
	},
	
	insertRow: function(target, index, row){
		var opts = $.data(target, 'datagrid').options;
		var dc = $.data(target, 'datagrid').dc;
		var panel = $(target).datagrid('getPanel');
		var view1 = dc.view1;
		var view2 = dc.view2;
		
		var isAppend = false;
		var rowLength = $(target).datagrid('getRows').length;
		if (rowLength == 0){
			$(target).datagrid('loadData',{total:1,rows:[row]});
			return;
		}
		
		if (index == undefined || index == null || index >= rowLength) {
			index = rowLength;
			isAppend = true;
			this.canUpdateDetail = false;
		}
		
		$.fn.datagrid.defaults.view.insertRow.call(this, target, index, row);
		
		_insert(true);
		_insert(false);
		
		this.canUpdateDetail = true;
		
		function _insert(frozen){
			var v = frozen ? view1 : view2;
			var tr = v.find('tr[datagrid-row-index='+index+']');
			
			if (isAppend){
				var newDetail = tr.next().clone();
				tr.insertAfter(tr.next());
			} else {
				var newDetail = tr.next().next().clone();
			}
			newDetail.insertAfter(tr);
			newDetail.hide();
			if (!frozen){
				newDetail.find('div.datagrid-row-detail').html(opts.detailFormatter.call(target, index, row));
			}
		}
	},
	
	deleteRow: function(target, index){
		var opts = $.data(target, 'datagrid').options;
		var dc = $.data(target, 'datagrid').dc;
		var tr = opts.finder.getTr(target, index);
		tr.next().remove();
		$.fn.datagrid.defaults.view.deleteRow.call(this, target, index);
		dc.body2.triggerHandler('scroll');
	},
	
	updateRow: function(target, rowIndex, row){
		var dc = $.data(target, 'datagrid').dc;
		var opts = $.data(target, 'datagrid').options;
		var cls = $(target).datagrid('getExpander', rowIndex).attr('class');
		$.fn.datagrid.defaults.view.updateRow.call(this, target, rowIndex, row);
		$(target).datagrid('getExpander', rowIndex).attr('class',cls);
		
		// update the detail content
		if (this.canUpdateDetail){
			var row = $(target).datagrid('getRows')[rowIndex];
			var detail = $(target).datagrid('getRowDetail', rowIndex);
			detail.html(opts.detailFormatter.call(target, rowIndex, row));
		}
	},
	
	bindEvents: function(target){
		var state = $.data(target, 'datagrid');

		if (state.ss.bindDetailEvents){return;}
		state.ss.bindDetailEvents = true;

		var dc = state.dc;
		var opts = state.options;
		var body = dc.body1.add(dc.body2);
		var clickHandler = ($.data(body[0],'events')||$._data(body[0],'events')).click[0].handler;
		body.unbind('click').bind('click', function(e){
			var tt = $(e.target);
			var tr = tt.closest('tr.datagrid-row');
			if (!tr.length){return}
			if (tt.hasClass('datagrid-row-expander')){
				var rowIndex = parseInt(tr.attr('datagrid-row-index'));
				if (tt.hasClass('datagrid-row-expand')){
					$(target).datagrid('expandRow', rowIndex);
				} else {
					$(target).datagrid('collapseRow', rowIndex);
				}
				$(target).datagrid('fixRowHeight');
				
			} else {
				clickHandler(e);
			}
			e.stopPropagation();
		});
	},
	
	onBeforeRender: function(target){
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		var dc = state.dc;
		var t = $(target);
		var hasExpander = false;
		var fields = t.datagrid('getColumnFields',true).concat(t.datagrid('getColumnFields'));
		for(var i=0; i<fields.length; i++){
			var col = t.datagrid('getColumnOption', fields[i]);
			if (col.expander){
				hasExpander = true;
				break;
			}
		}
		if (!hasExpander){
			if (opts.frozenColumns && opts.frozenColumns.length){
				opts.frozenColumns[0].splice(0,0,{field:'_expander',expander:true,width:24,resizable:false,fixed:true});
			} else {
				opts.frozenColumns = [[{field:'_expander',expander:true,width:24,resizable:false,fixed:true}]];
			}
			
			var t = dc.view1.children('div.datagrid-header').find('table');
			var td = $('<td rowspan="'+opts.frozenColumns.length+'"><div class="datagrid-header-expander" style="width:24px;"></div></td>');
			if ($('tr',t).length == 0){
				td.wrap('<tr></tr>').parent().appendTo($('tbody',t));
			} else if (opts.rownumbers){
				td.insertAfter(t.find('td:has(div.datagrid-header-rownumber)'));
			} else {
				td.prependTo(t.find('tr:first'));
			}
		}

		// if (!state.bindDetailEvents){
		// 	state.bindDetailEvents = true;
		// 	var that = this;
		// 	setTimeout(function(){
		// 		that.bindEvents(target);
		// 	},0);
		// }
	},
	
	onAfterRender: function(target){
		var that = this;
		var state = $.data(target, 'datagrid');
		var dc = state.dc;
		var opts = state.options;
		var panel = $(target).datagrid('getPanel');
		
		$.fn.datagrid.defaults.view.onAfterRender.call(this, target);
		
		if (!state.onResizeColumn){
			state.onResizeColumn = opts.onResizeColumn;
		}
		if (!state.onResize){
			state.onResize = opts.onResize;
		}
		function resizeDetails(){
			var ht = dc.header2.find('table');
			var fr = ht.find('tr.datagrid-filter-row').hide();
			var ww = ht.width()-1;
			var details = dc.body2.find('div.datagrid-row-detail:visible')._outerWidth(ww);
			details.find('.easyui-fluid').trigger('_resize');
			fr.show();
		}
		
		opts.onResizeColumn = function(field, width){
			if (!opts.fitColumns){
				resizeDetails();				
			}
			var rowCount = $(target).datagrid('getRows').length;
			for(var i=0; i<rowCount; i++){
				$(target).datagrid('fixDetailRowHeight', i);
			}
			
			// call the old event code
			state.onResizeColumn.call(target, field, width);
		};
		opts.onResize = function(width, height){
			if (opts.fitColumns){
				resizeDetails();				
			}
			state.onResize.call(panel, width, height);
		};
		
		this.canUpdateDetail = true;	// define if to update the detail content when 'updateRow' method is called;
		
		var footer = dc.footer1.add(dc.footer2);
		footer.find('span.datagrid-row-expander').css('visibility', 'hidden');
		$(target).datagrid('resize');

		this.bindEvents(target);
		var detail = dc.body1.add(dc.body2).find('div.datagrid-row-detail');
		detail.unbind().bind('mouseover mouseout click dblclick contextmenu scroll', function(e){
			e.stopPropagation();
		});
	}
});

$.extend($.fn.datagrid.methods, {
	fixDetailRowHeight: function(jq, index){
		return jq.each(function(){
			var opts = $.data(this, 'datagrid').options;
			if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))){
				return;
			}
			var dc = $.data(this, 'datagrid').dc;
			var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
			var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
			// fix the detail row height
			if (tr2.is(':visible')){
				tr1.css('height', '');
				tr2.css('height', '');
				var height = Math.max(tr1.height(), tr2.height());
				tr1.css('height', height);
				tr2.css('height', height);
			}
			dc.body2.triggerHandler('scroll');
		});
	},
	getExpander: function(jq, index){	// get row expander object
		var opts = $.data(jq[0], 'datagrid').options;
		return opts.finder.getTr(jq[0], index).find('span.datagrid-row-expander');
	},
	// get row detail container
	getRowDetail: function(jq, index){
		var opts = $.data(jq[0], 'datagrid').options;
		var tr = opts.finder.getTr(jq[0], index, 'body', 2);
		return tr.next().find('div.datagrid-row-detail');
	},
	expandRow: function(jq, index){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var dc = $.data(this, 'datagrid').dc;
			var expander = $(this).datagrid('getExpander', index);
			if (expander.hasClass('datagrid-row-expand')){
				expander.removeClass('datagrid-row-expand').addClass('datagrid-row-collapse');
				var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
				var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
				tr1.show();
				tr2.show();
				$(this).datagrid('fixDetailRowHeight', index);
				if (opts.onExpandRow){
					var row = $(this).datagrid('getRows')[index];
					opts.onExpandRow.call(this, index, row);
				}
			}
		});
	},
	collapseRow: function(jq, index){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var dc = $.data(this, 'datagrid').dc;
			var expander = $(this).datagrid('getExpander', index);
			if (expander.hasClass('datagrid-row-collapse')){
				expander.removeClass('datagrid-row-collapse').addClass('datagrid-row-expand');
				var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
				var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
				tr1.hide();
				tr2.hide();
				dc.body2.triggerHandler('scroll');
				if (opts.onCollapseRow){
					var row = $(this).datagrid('getRows')[index];
					opts.onCollapseRow.call(this, index, row);
				}
			}
		});
	}
});


 </script>
<script type="text/javascript">
		var url;
		var idrow = 3;
		var idrow2 = 3;
		<!-- NOTA DINAS -->
			function notadinas(){
				$('#dlg_notadinas').dialog('open').dialog('setTitle','Nota Dinas');
			$('#fmnotadinas').form('clear');
				CKEDITOR.instances.isi.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
			url = '<?php echo site_url('sisum/create_notadinas'); ?>';	
		}
		
			function cetaknotadinas(){
			var row = $('#dg_notadinas').datagrid('getSelected');
			if (row){
			var id=row.id_notadinas;
			window.open('<?php echo site_url('sisum/cetak_notadinas'); ?>/' +id);
			}
			}
			
			function editnotadinas(){
			var row = $('#dg_notadinas').datagrid('getSelected');
			if (row){
				$('#dlg_notadinas').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmnotadinas').form('load',row);
				CKEDITOR.instances.isi.setData( row.isi, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				url = '<?php echo site_url('sisum/update_notadinas'); ?>/' + row.id_notadinas;
				}
			}
		
			function simpan_notadinas(){
			$('#fmnotadinas').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#fmnotadinas').form('clear');
						$('#dlg_notadinas').dialog('close');		// close the dialog
						$('#dg_notadinas').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmnotadinas').form('clear');
					}
				}
			});
		}
		
		
		<!-- DISPOSISI -->
			function disposisi(){
			$('#dialogdisposisi').dialog('open').dialog('setTitle','Tulis Disposisi');
			$('#formdisposisi').form('clear');
			CKEDITOR.instances.perihal.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
			CKEDITOR.instances.diteruskan_kepada.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
			CKEDITOR.instances.catatan.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				url = '<?php echo site_url('sisum/create_disposisi'); ?>';	
			}
		
			function simpan_disposisi(){
			$('#formdisposisi').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#formdisposisi').form('clear');
						$('#dialogdisposisi').dialog('close');		// close the dialog
						$('#dg_disposisi').datagrid('reload');		// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#formdisposisi').form('clear');
					}
				}
				});
				}

			function cetakdisposisi(){
			var row = $('#dg_disposisi').datagrid('getSelected');
			if (row){
			var id=row.id_disposisi;
			window.open('<?php echo site_url('sisum/cetak_disposisi'); ?>/' +id);
			}
			}
			
			function editdisposisi(){
			var row = $('#dg_disposisi').datagrid('getSelected');
			if (row){
				$('#dialogdisposisi').dialog('open').dialog('setTitle','Rubah Data');
				$('#formdisposisi').form('load',row);
				CKEDITOR.instances.perihal.setData( row.perihal, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				CKEDITOR.instances.diteruskan_kepada.setData( row.diteruskan_kepada, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				CKEDITOR.instances.catatan.setData( row.catatan, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				url = '<?php echo site_url('sisum/update_disposisi'); ?>/' + row.id_disposisi;
				}
			}

		<!-- PINJAM PAKAI -->
		function pinjampakai(){
		$('#dlg_pinjampakai').dialog('open').dialog('setTitle','Pinjam Pakai Kendaraan Dinas');
			$('#fmpinjampakai').form('clear');
			url = '<?php echo site_url('sisum/create_pinjampakai'); ?>';	
		}
		
		function simpan_pinjampakai(){
		$('#fmpinjampakai').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#dlg_pinjampakai').dialog('close');		// close the dialog
						$('#dg_pinjampakai').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmpinjampakai').form('clear');
					}
				}
			});
		}
		
		function editpinjampakai(){
		var row = $('#dg_pinjampakai').datagrid('getSelected');
			if (row){
				$('#dlg_pinjampakai').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmpinjampakai').form('load',row);
				url = '<?php echo site_url('sisum/update_pinjampakai'); ?>/' + row.id_pinjampakai;
				}
			}	
		
		function cetakpinjampakai(){
		var row = $('#dg_pinjampakai').datagrid('getSelected');
			if (row){
			var id=row.id_pinjampakai;
			window.open('<?php echo site_url('sisum/cetak_pinjampakai'); ?>/' +id);
			}
			}
			
			
		<!-- KENAIKAN PANGKAT -->
		function kenaikanpangkat(){
			$('#dlg_kenaikanpangkat').dialog('open').dialog('setTitle','Kenaikan Pangkat');
			$('#fmkenaikanpangkat').form('clear');
			url = '<?php echo site_url('sisum/create_kenaikanpangkat'); ?>';
			//url = 'module/buat_surat/update_pangkat.php?id='+row.id_naikpangkat+'&nomer='+row.nomor_kenaikan_pangkat ;
	
			}
		
		function simpan_pangkat(){
			$('#fmkenaikanpangkat').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data sukses disimpan ke database',
							timeout:1000,
							showType:'slide'
						});
						$('#dlg_kenaikanpangkat').dialog('close');		// close the dialog
						$('#dg_kenaikanpangkat').datagrid('reload');// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmkenaikanpangkat').form('clear');
					}
				}
			});
		}
		
		function simpan_pangkat2(){
			$('#fmkenaikanpangkat2').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},


				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data sukses disimpan ke database',
							timeout:1000,
							showType:'slide'
						});
						$('#dlg_kenaikanpangkat2').dialog('close');		// close the dialog
						$('#dg_kenaikanpangkat').datagrid('reload');// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmkenaikanpangkat2').form('clear');
					}
				}
			});
		}
		
		function cetakpangkat(){
		var row = $('#dg_kenaikanpangkat').datagrid('getSelected');
			if (row){
			var id=row.nomor_kenaikan_pangkat;
			window.open('<?php echo site_url('sisum/cetak_pangkat'); ?>/' +id);
			}
			}
		
		function editpangkat(){
		var row = $('#dg_kenaikanpangkat').datagrid('getSelected');
			if (row){
				$('#dlg_kenaikanpangkat2').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmkenaikanpangkat2').form('load',row);
				url = '<?php echo site_url('sisum/update_kenaikanpangkat?id='); ?>' + row.id_naikpangkat +'&nomor='+row.nomor_kenaikan_pangkat;
				}
			}	
		
		<!-- GAJI -->
		function kenaikangaji(){
			$('#dlg_kenaikangaji').dialog('open').dialog('setTitle','Kenaikan Gaji');
			$('#fmkenaikangaji').form('clear');
			url = '<?php echo site_url('sisum/create_kenaikangaji'); ?>';	
			}
			
		function simpan_kenaikangaji(){
		$('#fmkenaikangaji').form('submit',{
					url: url,
					onSubmit: function(){
						return $(this).form('validate');
					},
					success: function(result){
						var result = eval('('+result+')');
						if (result.success){
						$.messager.show({
								title: 'Sukses Simpan Data',
								msg: 'Data Berhasil disimpan',
								timeout:1000,
								showType:'slide'
							});
							$('#dlg_kenaikangaji').dialog('close');		// close the dialog
							$('#dg_gaji').datagrid('reload');// reload the user data
						} else {
							$.messager.show({
								title: 'Error',
								msg: result.msg,
								timeout:1000,
								showType:'slide'
							});
							$('#fmkenaikangaji').form('clear');
						}
					}
				});
			}

		function cetakgaji(){
		var row = $('#dg_gaji').datagrid('getSelected');
			if (row){
			var id=row.id_naikgaji;
			window.open('<?php echo site_url('sisum/cetak_gaji'); ?>/' +id);
			}
			}
			
		function editgaji(){
		var row = $('#dg_gaji').datagrid('getSelected');
			if (row){
				$('#dlg_kenaikangaji').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmkenaikangaji').form('load',row);
				url = '<?php echo site_url('sisum/update_kenaikangaji'); ?>/' + row.id_naikgaji;
				}
			}
		
			
		<!-- CUTI -->
		function cutitahunan(){
			$('#dlg_cuti').dialog('open').dialog('setTitle','Lampiran Cuti Tahunan');
			$('#fmcuti').form('clear');
			url = '<?php echo site_url('sisum/create_cuti'); ?>';	
			}
			
		function simpan_cutitahunan(){
			$('#fmcuti').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#dlg_cuti').dialog('close');		// close the dialog
						$('#dg_lampirancuti').datagrid('reload');// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmcuti').form('clear');
					}
				}
			});
		}
		
		function editcuti(){
		var row = $('#dg_lampirancuti').datagrid('getSelected');
			if (row){
				$('#dlg_cuti').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmcuti').form('load',row);
					url = '<?php echo site_url('sisum/update_cuti'); ?>/' + row.id_cuti;
			}
			}	
		
		function cetakcuti(){
		var row = $('#dg_lampirancuti').datagrid('getSelected');
			if (row){
			var id=row.id_cuti;
			window.open('<?php echo site_url('sisum/cetak_cuti'); ?>/' +id);
			}
			}
		
		<!-- NOTULEN -->
		function notulen(){
			$('#dlg_notulen').dialog('open').dialog('setTitle','Notulen Rapat');
			$('#fmnotulen').form('clear');
				CKEDITOR.instances.acara.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
			CKEDITOR.instances.peserta.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
			CKEDITOR.instances.materi.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
			CKEDITOR.instances.kesimpulan.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});

			url = '<?php echo site_url('sisum/create_notulen'); ?>';	
			}
			
		function simpan_notulen(){
				$('#fmnotulen').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#dlg_notulen').dialog('close');		// close the dialog
						$('#dg_notulen').datagrid('reload');// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmnotulen').form('clear');
					}
				}
			});
		}

		function cetaknotulen(){
		var row = $('#dg_notulen').datagrid('getSelected');
			if (row){
			var id=row.id_notulen;
			window.open('<?php echo site_url('sisum/cetak_notulen'); ?>/' +id);
			}
			}
			
		function editnotulen(){
		var row = $('#dg_notulen').datagrid('getSelected');
			if (row){
				$('#dlg_notulen').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmnotulen').form('load',row);
				CKEDITOR.instances.acara.setData( row.acara, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				CKEDITOR.instances.peserta.setData( row.peserta, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				CKEDITOR.instances.materi.setData( row.materi, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				CKEDITOR.instances.kesimpulan.setData( row.kesimpulan, function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
				url = '<?php echo site_url('sisum/update_notulen'); ?>/' + row.id_notulen;
				}
			}

		
		<!-- TUNJANGAN -->
			function tunjangan(){
			$('#dlg_tunjangan').dialog('open').dialog('setTitle','Surat Keterangan Tunjangan');
			$('#fmtunjangan').form('clear');
			url = '<?php echo site_url('sisum/create_tunjangan'); ?>';	
			}
		
			function simpan_tunjangan(){
			$('#fmtunjangan').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#dlg_tunjangan').dialog('close');		// close the dialog
						$('#dg_tunjangan').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmtunjangan').form('clear');
					}
				}
			});
		}

			function cetaktunjangan(){
			var row = $('#dg_tunjangan').datagrid('getSelected');
			if (row){
			var id=row.nomor_tunjangan;
			window.open('<?php echo site_url('sisum/cetak_tunjangan'); ?>/' +id);
			}
			}
		
			function edittunjangan(){
			var row = $('#dg_tunjangan').datagrid('getSelected');
			if (row){
				$('#dlg_tunjangan2').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmtunjangan2').form('load',row);
				url = '<?php echo site_url('sisum/update_tunjangan?id='); ?>' + row.id_tunjangan +'&nomor='+row.nomor_tunjangan;
				}
			}
			
			function simpan_tunjangan2(){
			$('#fmtunjangan2').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#dlg_tunjangan2').dialog('close');		// close the dialog
						$('#dg_tunjangan').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmtunjangan2').form('clear');
					}
				}
			});
		}

		
		<!-- SPT -->
			function spt(){
			$('#dlg_spt').dialog('open').dialog('setTitle','Tulis SPT');
			$('#fmspt').form('clear');
			url = '<?php echo site_url('sisum/create_spt'); ?>';	
			}
		
			function editspt(){
			var row = $('#dg_spt').datagrid('getSelected');
			if (row){
				$('#dlg_spt').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmspt').form('load',row);
				url = '<?php echo site_url('sisum/update_spt'); ?>/' + row.id_spt;
				}
			}	

			function cetakspt(){
			var row = $('#dg_spt').datagrid('getSelected');
			if (row){
			var id=row.id_spt;
			window.open('<?php echo site_url('sisum/cetak_spt'); ?>/' +id);
			}
			}
		
			function simpan_spt(){
			$('#fmspt').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:1000,
							showType:'slide'
						});
						$('#fmspt').form('clear');
						$('#dlg_spt').dialog('close');		// close the dialog
						$('#dg_spt').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:1000,
							showType:'slide'
						});
						$('#fmspt').form('clear');
					}
				}
			});
		}
		
			
			<!-- Format Tanggal -->
			function myformatter(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
			}
			
			function myparser(s){
			if (!s) return new Date();
			var ss = (s.split('-'));
			var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				return new Date(y,m-1,d);
			} else {
				return new Date();
			}
		}

			<!-- Fungsi Tambah Di Grid Langsung -->
			function tambah(){
			var no = $("#datatable2 tr").length - 1;
    var x=document.getElementById('datatable2').insertRow(idrow);
    var td1=x.insertCell(0);
    var td2=x.insertCell(1);
    var td3=x.insertCell(2);
    var td4=x.insertCell(3);
    var td5=x.insertCell(4);
    var td6=x.insertCell(5);
    var td7=x.insertCell(6);
    
	td1.innerHTML=no;
    td2.innerHTML="<input type='text' size='70'  name='nama[]'>";
    td3.innerHTML="<input type ='text' size='6' name='lama[]'>";
    td4.innerHTML="<input type ='text' size='10' maxlenght='10' name='lamatmt[]'>";
    td5.innerHTML="<input type ='text' size='6' name='baru[]'>";
    td6.innerHTML="<input type ='text' size='10' maxlenght='10' name='barutmt[]'>";
    td7.innerHTML="<input type ='text' name='ket[]'>";
   
    idrow++;
}

			
			function tambah2(){
			var no2 = $("#susunan tr").length - 1;
    var x2=document.getElementById('susunan').insertRow(idrow2);
    var td1=x2.insertCell(0);
    var td2=x2.insertCell(1);
    var td3=x2.insertCell(2);
    var td4=x2.insertCell(3);
    var td5=x2.insertCell(4);
    var td6=x2.insertCell(5);
    
	td1.innerHTML=no2;
    td2.innerHTML="<input class='easyui-textbox' type='text' name='nama2[]' size='70' data-options='required:true'>";
    td3.innerHTML="<input class='easyui-datebox' name='kelahiran[]' data-options='formatter:myformatter,parser:myparser,required:true'>";
    td4.innerHTML="<input class='easyui-datebox' name='perkawinan[]' data-options='formatter:myformatter,parser:myparser,required:true'>";
    td5.innerHTML="<input class='easyui-textbox' type='text' name='pekerjaan[]' data-options='required:true'>";
    td6.innerHTML="<input class='easyui-textbox' type='text' name='ket2[]'  data-options='required:true'>";
   
    idrow2++;
}
			
			<!-- Fungsi hapus langsung di grid -->
			function hapus(){
  			if(idrow>3){
        var x=document.getElementById('datatable2').deleteRow(idrow-1);
        idrow--;
    	}
		}

			function hapus2(){
    		if(idrow2>3){
        var x=document.getElementById('susunan').deleteRow(idrow2-1);
        idrow2--;
    	}
		}


<!-- fungsi pencarian -->
function caridisposisi(value){  
	$('#dg_disposisi').datagrid('load',{    
        caridisposisi: value
    });  
}  
function caripangkat(value){  
	$('#dg_kenaikanpangkat').datagrid('load',{    
        caripangkat: value
    });  
}  
function carigaji(value){  
	$('#dg_kenaikangaji').datagrid('load',{    
        carigaji: value
    });  
}  
function caripinjam(value){  
	$('#dg_pinjampakai').datagrid('load',{    
        caripinjampakai: value
    });  
}  
function carispt(value){  
	$('#dg_spt').datagrid('load',{    
        carispt: value
    });  
}  

function caricuti(value){  
	$('#dg_lampirancuti').datagrid('load',{    
        caricuti: value
    });  
}  
function carinotulen(value){  
	$('#dg_notulen').datagrid('load',{    
        carinotulen: value
    });  
}  
function caritunjangan(value){  
	$('#dg_tunjangan').datagrid('load',{    
        caritunjangan: value
    });  
}  

function carinotadinas(value){  
	$('#dg_notadinas').datagrid('load',{    
        carinotadinas: value
    });  
}  


				
<!-- SCRIPT untuk membuat sub_grid beserta fungsinya -->

//Subgrid kenaikan pangkat
function simpan_lampiranpangkat(){
$('#fmlampiranpangkat').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:3000,
							showType:'slide'
						});
						$('#fmlampiranpangkat').form('clear');
						$('#dlg_lampiranpangkat').dialog('close');		// close the dialog
						$('#dg_lampiranpangkat').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:3000,
							showType:'slide'
						});
						$('#fmlampiranpangkat').form('clear');
					}
				}
			});
		}

$(function(){
$('#dg_kenaikanpangkat').datagrid({
view: detailview,
detailFormatter:function(index,row){
return '<div style="padding:2px"><table id="dg_lampiranpangkat" class="ddv" style="width:700px; height: 400px;"></table></div>';
},

onExpandRow: function(index,row){
var toolbar1 = [{
text:'Tambah',
iconCls:'icon-add',
handler:function(){
var id=row.nomor_kenaikan_pangkat;
$('#dlg_lampiranpangkat').dialog('open').dialog('setTitle','Tambah Data Baru');
			$('#fmlampiranpangkat').form('clear');
					url = '<?php echo site_url('sisum/create_lampiranpangkat?id='); ?>'  + id;
		//url = 'module/buat_surat/sim_lampiranpangkat.php?nomor='+row.nomor_kenaikan_pangkat;
}
},'-',{
text:'Hapus',
iconCls:'icon-cut',
handler:function(){
	var row = $(ddv2).datagrid('getSelected');  
	if (row){  
		$.messager.confirm('Konfirmasi','Yakin akan menghapus Nama' + ' : ' + '<strong>'+row.nama+'</strong>'+ ' dari daftar',function(r){  
			if (r){  
				$.ajax({
					type	: "POST",
					url		: "<?php echo site_url('sisum/delete_lampiranpangkat'); ?>",
					data	: 'id_lampiran_pangkat='+row.id_lampiran_pangkat,
					success	: function(data){
						$.messager.show({
							title:'Info',
							msg:'Sukses Hapus Data', 
							timeout:2000,
							showType:'slide'
						});
						$(ddv2).datagrid('reload');
					}
				});  
			}  
		});  
	}  

}
},'-',{
text:'Edit',
iconCls:'icon-edit',
handler:function(){
var row = $(ddv2).datagrid('getSelected');
			if (row){
				$('#dlg_lampiranpangkat').dialog('open').dialog('setTitle','Rubah Data');
			$('#fmlampiranpangkat').form('clear');
				$('#fmlampiranpangkat').form('load',row);
					url = '<?php echo site_url('sisum/update_lampiranpangkat'); ?>/' + row.id_lampiran_pangkat;
						//		url = 'module/buat_surat/update_lampiranpangkat.php?id_lampiran_pangkat='+row.id_lampiran_pangkat;
				}
				}
}];

//detail
var ddv2 = $(this).datagrid('getRowDetail',index).find('table.ddv'), id=row.nomor_kenaikan_pangkat;
ddv2.datagrid({
url:'<?php echo site_url('sisum/getjson_lampiranpangkat?nomer='); ?>' +id ,
fitColumns:true,
singleSelect:true,
rownumbers:true,
title:'Daftar pegawai yang naik pangkat sesuai nomor = '+id,
toolbar:toolbar1,
loadMsg:'',
height:'auto',
columns:[[
{field:'nama',title:'Nama',width:100,align:'left'},
{field:'lama_gol',title:'Golongan Lama',width:100,align:'left'},
{field:'tmt_lama',title:'TMT Lama',width:100,align:'left'},
{field:'baru_gol',title:'Golongan Baru',width:100,align:'left'},
{field:'tmt_baru',title:'TMT Baru',width:100,align:'left'},
{field:'ket',title:'Keterangan',width:100,align:'left'}
]],
onResize:function(){
$('#dg_kenaikanpangkat').datagrid('fixDetailRowHeight',index);
},
onLoadSuccess:function(){
setTimeout(function(){
$('#dg_kenaikanpangkat').datagrid('fixDetailRowHeight',index);
},0);
}
});
$('#dg_kenaikanpangkat').datagrid('fixDetailRowHeight',index);
}
});
});


//Subgrid tunjangan

function simpan_lampirantunjangan(){
$('#fmlampirantunjangan').form('submit',{
				url: url,
				onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
					$.messager.show({
							title: 'Sukses Simpan Data',
							msg: 'Data Berhasil disimpan',
							timeout:3000,
							showType:'slide'
						});
						$('#fmlampirantunjangan').form('clear');
						$('#dlg_lampirantunjangan').dialog('close');		// close the dialog
						$('#dg_lampirantunjangan').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Error',
							msg: result.msg,
							timeout:3000,
							showType:'slide'
						});
						$('#fmlampirantunjangan').form('clear');
					}
				}
			});
		}
		

$(function(){
$('#dg_tunjangan').datagrid({
view: detailview,
detailFormatter:function(index,row){
return '<div style="padding:2px"><table id="dg_lampirantunjangan" class="ddv"></table></div>';
},
onExpandRow: function(index,row){
var toolbar2 = [{
text:'Tambah',
iconCls:'icon-add',
handler:function(){
var id=row.nomor_tunjangan;
$('#dlg_lampirantunjangan').dialog('open').dialog('setTitle','Tambah Data Baru');
			$('#fmlampirantunjangan').form('clear');
	url = '<?php echo site_url('sisum/create_lampirantunjangan?id='); ?>'  + id;
		//url = 'module/buat_surat/sim_lampirantunjangan.php?nomor='+row.nomor_tunjangan;
}
},'-',{
text:'Hapus',
iconCls:'icon-cut',
handler:function(){
	var row = $(ddv).datagrid('getSelected');  
	if (row){  
		$.messager.confirm('Konfirmasi','Yakin akan menghapus Nama' + ' : ' + '<strong>'+row.nama+'</strong>',function(r){  
			if (r){  
				$.ajax({
					type	: "POST",
					url		: "<?php echo site_url('sisum/delete_lampirantunjangan'); ?>",
					data	: 'id_lampiran_tunjangan='+row.id_lampiran_tunjangan,
					success	: function(data){
						$.messager.show({
							title:'Info',
							msg:"Sukses ", 
							timeout:1000,
							showType:'slide'
						});
						$('#dg_lampirantunjangan').datagrid('reload');
					}
				});  
			}  
		});  
	}  

}
},'-',{
text:'Edit',
iconCls:'icon-edit',
handler:function(){
var row = $(ddv).datagrid('getSelected');
			if (row){
				$('#dlg_lampirantunjangan').dialog('open').dialog('setTitle','Rubah Data');
				$('#fmlampirantunjangan').form('load',row);
				url = '<?php echo site_url('sisum/update_lampirantunjangan'); ?>/' + row.id_lampiran_tunjangan;
					//url = 'module/buat_surat/update_lampirantunjangan.php?id_lampiran_tunjangan='+row.id_lampiran_tunjangan;
				}}
			
}];

var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv'), id=row.nomor_tunjangan;
ddv.datagrid({
url:'<?php echo site_url('sisum/getjson_lampirantunjangan?nomer='); ?>' +id,
fitColumns:true,
singleSelect:true,
rownumbers:true,
title:'Daftar anggota keluarga yang mendapat tunjangan sesuai no = '+ id,
toolbar:toolbar2,
loadMsg:'',
height:'auto',
columns:[[
{field:'nama',title:'Nama',width:100,align:'right'},
{field:'kelahiran',title:'Kelahiran',width:100,align:'right'},
{field:'perkawinan',title:'Perkawinan',width:100,align:'right'},
{field:'pekerjaan',title:'Pekerjaan',width:100,align:'right'},
{field:'ket',title:'Keterangan',width:100,align:'right'}
]],
onResize:function(){
$('#dg_tunjangan').datagrid('fixDetailRowHeight',index);
},
onLoadSuccess:function(){
setTimeout(function(){
$('#dg_tunjangan').datagrid('fixDetailRowHeight',index);
},0);
}
});
$('#dg_tunjangan').datagrid('fixDetailRowHeight',index);
}
});
});
