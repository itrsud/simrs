<div class="ace-settings-container" id="ace-settings-container">
    <div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
        <i class="ace-icon fa fa-cog bigger-130"></i>
    </div>

    <div class="ace-settings-box clearfix" id="ace-settings-box">
        <div class="pull-left width-50">
            <div class="ace-settings-item">
                <div class="pull-left">
                    <select id="skin-colorpicker" class="hide">
                        <option data-skin="no-skin" value="#438EB9">#438EB9</option>
                        <option data-skin="skin-1" value="#222A2D">#222A2D</option>
                        <option data-skin="skin-2" value="#C6487E">#C6487E</option>
                        <option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
                    </select>
                </div>
                <span>&nbsp; Choose Skin</span>
            </div>

            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-navbar" autocomplete="off" />
                <label class="lbl" for="ace-settings-navbar"> Fixed Navbar</label>
            </div>

            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-sidebar" autocomplete="off" />
                <label class="lbl" for="ace-settings-sidebar"> Fixed Sidebar</label>
            </div>

            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-breadcrumbs" autocomplete="off" />
                <label class="lbl" for="ace-settings-breadcrumbs"> Fixed Breadcrumbs</label>
            </div>

            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl" autocomplete="off" />
                <label class="lbl" for="ace-settings-rtl"> Right To Left (rtl)</label>
            </div>

            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-add-container" autocomplete="off" />
                <label class="lbl" for="ace-settings-add-container">
                    Inside
                    <b>.container</b>
                </label>
            </div>
        </div><!-- /.pull-left -->

        <div class="pull-left width-50">
            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover" autocomplete="off" />
                <label class="lbl" for="ace-settings-hover"> Submenu on Hover</label>
            </div>

            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact" autocomplete="off" />
                <label class="lbl" for="ace-settings-compact"> Compact Sidebar</label>
            </div>

            <div class="ace-settings-item">
                <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight" autocomplete="off" />
                <label class="lbl" for="ace-settings-highlight"> Alt. Active Item</label>
            </div>
        </div><!-- /.pull-left -->
    </div><!-- /.ace-settings-box -->
</div><!-- /.ace-settings-container -->

<div class="page-header">
    <h1>
        <?php echo $data_table;?>
        <small>
            <i class="ace-icon fa fa-angle-double-right"></i>
            Static &amp; Dynamic Tables
        </small>
    </h1>
</div>

<!-- /.page-header -->

<div class="row">
    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <div class="row">
            <div class="col-xs-12">
                <div class="clearfix">
                    <button id="addRole" class="btn btn-success btn-xs" title="Tambah Role Baru"><i class="fa fa-plus"></i> ADD</button>
                    <button id="editRole" class="btn btn-info btn-xs" title="Ubah Role"><i class="fa fa-pencil"></i> EDIT</button>
                    <button id="deleteRole" class="btn btn-danger btn-xs" title="Hapus Role"><i class="fa fa-trash"></i> DELETE</button>
                    
                    <hr/>
                    <div class="pull-right tableTools-container"></div>
                </div>
                <div>

                    <div class="row">
                    <div class="col-xs-12">
                        <div class="table-header ">
                        Data Group                                        
                        </div>
                    <div>
                    <table id="example" class="display" style="width:100%">
                        <thead>
                            <tr>

                                <th>Role Code</th>
                                <th>Role Name</th>
                                <th>Rule</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        
                    </table>
                </div>
                </div>
            </div>
        </div>
        <!-- PAGE CONTENT ENDS -->
    </div><!-- /.col -->
</div><!-- /.row -->


<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div class="modal-body">
                <form id="formAdd" method="POST" action="" class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-sm-3 ">Code</label>
                        <div class="col-sm-10 col-sm-offset-1">
                            <input type="text" class="form-control" name="role_cd" placeholder="Role Code">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-1">
                            <input type="text" class="form-control" name="role_nm" placeholder="Nama Role">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="btnCancel"  type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button id="btnSave" type="button" name="" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Konfirmasi hapus?</h4>
            </div>
            <div class="modal-body">
                Yakin akan menghapus kategori?
            </div>
            <div class="modal-footer">
                <form id="formDelete" method="POST" action="">
                    <button id="btnCancel"  type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="btnHapus" type="button" class="btn btn-danger">Hapus</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->


<!--Datatables-->
<!-- <link rel="stylesheet" type="text/css" href="<?php echo base_url('asset/datatables.min.css');?>"/>
<script type="text/javascript" src="<?php echo base_url('asset/datatables.min.js');?>"></script>
 --><script>
    var url;
    var save_method; //for save method string
    var table;


    $(document).ready(function() {

        
         
        $('#example').DataTable({ 

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": "<?php echo base_url('index.php/get_role');?>",
                "type": "POST"
            },
            "order": [[ 0, "asc" ]]
        });

//         //    tambah
        $("#addRole").on(ace.click_event, function() {
               add_kapling();
        });

//         $('#deleteRole').click(function(){
// //            $('#deleteModal').modal('show');
//                         alert('delete ');
//         });
    });


function add_kapling()
{
    save_method = 'add';
    $('#form')[0].reset(); // reset form on modals
    $('.form-group').removeClass('has-error'); // clear error class
    $('.help-block').empty(); // clear error string
    $('#modal_form').modal('show'); // show bootstrap modal
    $('.modal-title').text('Kapling Ruang Rapat'); // Set Title to Bootstrap modal title
    $(".date-picker").datepicker("setDate", new Date());
}

</script>

<!-- Bootstrap modal -->
<div class="modal fade" id="modal_form" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 class="modal-title">Kapling Form</h3>
            </div>
            <div class="modal-body form">
                <form action="#" id="form" class="form-horizontal">
                        <input type="hidden" value="" name="id_kapling"/>
                        <div class="form-group">
                            <label class="control-label col-sm-3 ">Tanggal</label>
                           <div class="col-sm-9">
                          <input name="tanggal" id="tanggal" placeholder="yyyy-mm-dd"  style="text-align:right" class=" col-xs-4 date-picker" type="text">
                            </div>
                        </div>
                                                                            
                         <div class="form-group">
                            <label class="control-label col-md-3">Jam</label>
                                <div class="col-sm-9">
                           <input type="text" name="jam" id="jam" placeholder="Jam penggunaan RR" class="form-control">
                              </div>
                        </div>
                        
                         <div class="form-group">
                            <label class="control-label col-md-3">Acara</label>
                           <div class="col-md-9">
                                <input type="text" name="acara" id="acara" placeholder="Acara" class="form-control">
                            </div>
                        </div>
                         
                        
                        
                        
              
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnSave" onClick="save()" class="btn btn-white btn-default btn-round"><i class="ace-icon fa fa-floppy-o red"></i>Save</button>
                <button type="button" class="btn btn-white btn-default btn-round" data-dismiss="modal"><i class="ace-icon fa fa-times red2"></i>Cancel</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- End Bootstrap modal -->
