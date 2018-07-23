<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class M_menu extends CI_Model{
    function __construct(){
        parent::__construct();
    }


    public function menu($lvl='1',$root='',$role='admin'){
        $this->db->select('*');
        $this->db->from('com_menu AS cm');
        $this->db->join('com_role_menu AS crm','cm.menu_cd=crm.menu_cd','left');
        $this->db->join('com_role AS cr','cr.role_cd=crm.role_cd','left');
        $this->db->order_by('menu_no','asc');
        $this->db->where(array('cm.menu_level'=>$lvl,'cm.menu_root'=>$root,'cr.role_cd'=>$role));
        return $this->db->get();
    }

    public function check_root($cd){
        return $this->db->get_where('com_menu',array('menu_root'=>$cd));
    }
}
