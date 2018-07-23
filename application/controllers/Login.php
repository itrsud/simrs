<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('M_login');
        if($this->session->userdata('isLog')==TRUE){
            redirect('Welcome','refresh');
        }
    }

    public function index()
    {
        $data['judul']='Login';
        $this->load->view('login',$data);

    }
    public function auth()
    {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('username','Username','trim|required');
        $this->form_validation->set_rules('pass','Password','required');
        if($this->form_validation->run())
        {
            $data['judul'] = 'Admin | Login';
            $user=$this->input->post('username');
            $pass=$this->input->post('pass');
            if($this->M_login->cek_user($user,$pass)->num_rows()>0)
            {
                $secure=$this->M_login->cek_user($user,$pass)->row();
                if($secure==TRUE)
                {
                    $sessionArray = array(                   
                        'isLog'=>TRUE,
                        'isId'=>$secure->user_id,
                        'isUser'=>$secure->user_nm,
                        'isLevel'=>$secure->role_cd
                    );
                    $this->session->set_userdata($sessionArray);
//                    redirect(base_url('welcome'),'refresh');
                    echo "sukses<br/>";
                    echo $sessionArray['isId']."<br/>";
                    
                    echo $sessionArray['isUser']."<br/>";
                    
                    echo $sessionArray['isLevel']."<br/>";
                    
                    echo $sessionArray['isLog']."<br/>";
                    
                    echo $this->session->userdata('isUser');
                }else{
                    $this->session->set_flashdata('pesan','Login gagal!');
//                    redirect('login','refresh');
                    echo "gagal";
                }
            }
            else
            {
                $this->session->set_flashdata('pesan','Login gagal!');
//                redirect('login','refresh');
                echo "gagal";
            }
        }else{
            $this->session->set_flashdata('pesan','Username dan Password harus diisi!');
//            redirect('login','refresh');
            echo "gagal";
        }
    }
}
/* End of file Login.php */
/* Location: ./application/controllers/Login.php */