<?php

class Group extends CI_Controller{

    function __construct(){
        parent::__construct();
        $this->load->model('M_menu');
        $this->load->model('sistem/admin/Group_model');
    }

    public function index(){
        $data=array(
//			'menu_1'=>$this->M_menu->menu()->result(),
			'data_table'=>'ini data table',
            'role'=>'kasir'
		);
        $this->template->load('template','sistem/admin/group',$data);
    }
    
    public function ajax_list()
    {
        $list = $this->Group_model->get_data();
        $data = array();
        $no = $_POST['start'];
        foreach ($list as $group) {
            $no++;
            $row = array();
            $row[] = $group->role_cd;
            $row[] = $group->role_nm;
            $row[] = $group->role_tp;
 
            //add html for action
            $row[] = '<a class="btn btn-sm btn-primary" href="javascript:void(0)" title="Edit" onclick="edit_person('."'".$group->role_cd."'".')"><i class="glyphicon glyphicon-pencil"></i> Edit</a>
                  <a class="btn btn-sm btn-danger" href="javascript:void(0)" title="Hapus" onclick="delete_person('."'".$group->role_cd."'".')"><i class="glyphicon glyphicon-trash"></i> Delete</a>';
 
            $data[] = $row;
        }
 
        $output = array(
                        "draw" => $_POST['draw'],
                        "recordsTotal" => $this->Group_model->count_all(),
                        "recordsFiltered" => $this->Group_model->count_filtered(),
                        "data" => $data,
                );
        //output to json format
        echo json_encode($output);
    }
}
