<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['get_role'] = "sistem/admin/group/ajax_list";
$route['group'] = "sistem/admin/group";