<?php

/**
* 
*/
class M_login extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    public function cek_user($user,$pass)
    {
        $this->db->select('*');
        $this->db->from('com_user AS cu');
        $this->db->join('com_role_user crm','cu.user_id=crm.user_id');
        $this->db->where('cu.user_id',$user);
        $this->db->where('cu.password',$pass);
//        $this->db->where('status','Aktif');
        return $this->db->get();
    }
}