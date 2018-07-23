		var url;
		var idrow = 3;
		var idrow2 = 3;
	
		function notadinas(){
			$('#dlg_notadinas').dialog('open').dialog('setTitle','Nota Dinas');
			$('#fmnotadinas').form('clear');
				CKEDITOR.instances.isi.setData( "", function()
				{    this.checkDirty();  // mengambil data perihal ke ckeditor 
				});
			url = '<?php echo site_url('sisum/create_notadinas'); ?>';	
		}
		
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
		
		
		function pinjampakai(){
			$('#dlg_pinjampakai').dialog('open').dialog('setTitle','Pinjam Pakai Kendaraan Dinas');
			$('#fmpinjampakai').form('clear');
			url = '<?php echo site_url('sisum/create_pinjampakai'); ?>';	
		}
		
		
		function kenaikanpangkat(){
			$('#dlg_kenaikanpangkat').dialog('open').dialog('setTitle','Kenaikan Pangkat');
			$('#fmkenaikanpangkat').form('clear');
			url = '<?php echo site_url('sisum/create_kenaikanpangkat'); ?>';	
			}
		
		function kenaikangaji(){
			$('#dlg_kenaikangaji').dialog('open').dialog('setTitle','Kenaikan Gaji');
			$('#fmkenaikangaji').form('clear');
			url = '<?php echo site_url('sisum/create_kenaikangaji'); ?>';	
			}
		
		function cutitahunan(){
			$('#dlg_cuti').dialog('open').dialog('setTitle','Lampiran Cuti Tahunan');
			$('#fmcuti').form('clear');
			url = '<?php echo site_url('sisum/create_cuti'); ?>';	
			}
		
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

		
			function tunjangan(){
			$('#dlg_tunjangan').dialog('open').dialog('setTitle','Surat Keterangan Tunjangan');
			$('#fmtunjangan').form('clear');
			url = '<?php echo site_url('sisum/create_tunjangan'); ?>';	
			}
		
			function spt(){
			$('#dlg_spt').dialog('open').dialog('setTitle','Tulis SPT');
			$('#fmspt').form('clear');
			url = '<?php echo site_url('sisum/create_spt'); ?>';	
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
							// reload the user data
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
							$('#dg_kenaikangaji').datagrid('reload');// reload the user data
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

			function hapus(){
  			  if(idrow>3){
        var x=document.getElementById('datatable2').deleteRow(idrow-1);
        idrow--;
    }
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

      