<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta charset="utf-8" />
        <title>Login Page - Ace Admin</title>

        <meta name="description" content="User login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <!-- bootstrap & fontawesome -->
        <link rel="stylesheet" href="<?php echo base_url('aceadmin/assets/css/bootstrap.min.css');?>" />
        <link rel="stylesheet" href="<?php echo base_url('aceadmin/assets/font-awesome/4.5.0/css/font-awesome.min.css');?>" />

        <!-- text fonts -->
        <link rel="stylesheet" href="<?php echo base_url('aceadmin/assets/css/fonts.googleapis.com.css');?>" />

        <!-- ace styles -->
        <link rel="stylesheet" href="<?php echo base_url('aceadmin/assets/css/ace.min.css');?>" />

        <!--[if lte IE 9]>
<link rel="stylesheet" href="assets/css/ace-part2.min.css" />
<![endif]-->
        <link rel="stylesheet" href="<?php echo base_url('aceadmin/assets/css/ace-rtl.min.css');?>" />

        <!--[if lte IE 9]>
<link rel="stylesheet" href="assets/css/ace-ie.min.css" />
<![endif]-->

        <!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

        <!--[if lte IE 8]>
<script src="assets/js/html5shiv.min.js"></script>
<script src="assets/js/respond.min.js"></script>
<![endif]-->
    </head>

    <body class="login-layout" style="background:url(<?php echo base_url('aceadmin/assets/css/images/meteorshower2.jpg');?>) #394557">
        <div class="main-container">
            <div class="main-content">
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1">
                        <div class="login-container">
                            <div class="center">
                                <br/><h1>

                                <span class="red">RSUD</span>

                                <span class="white" id="id-text2">WONOSARI</span>
                                </h1><br/>
                                <!--								<h4 class="blue" id="id-company-text">Supported BY IT RSUD WONOSARI</h4>-->
                            </div>

                            <div class="space-6"></div>

                            <div class="position-relative">
                                <div id="login-box" class="login-box visible widget-box no-border">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <h4 class="header blue lighter bigger">
                                                <i class="ace-icon fa fa-plus green"></i>
                                                Sistem Informasi Rumah Sakit
                                            </h4>

                                            <div class="space-6">

                                            </div>
                                            <?php echo validation_errors('<font color=red>', '</font>'); ?>
                                            <?php
                                            if($this->session->flashdata('pesan')==TRUE):
                                            echo'<div class="alert alert-danger" role="alert">';
                                            echo $this->session->flashdata('pesan');
                                            endif;
                                            ?>
                                            <!--                                            <form method="POST" action="<?php echo base_url('login/auth');?>">-->
                                            <?php echo form_open('login/auth');?>
                                            <fieldset>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="text" class="form-control" name="username" placeholder="Username" required="required"/>
                                                        <i class="ace-icon fa fa-user"></i>
                                                    </span>
                                                </label>

                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="password" name="pass" class="form-control" placeholder="Password" value="+3X+FmOskk8=" required="required"/>
                                                        <i class="ace-icon fa fa-lock"></i>
                                                    </span>
                                                </label>

                                                <div class="space"></div>

                                                <div class="clearfix">
                                                    <label class="inline">
                                                        <input type="checkbox" class="ace" />
                                                        <span class="lbl"> Remember Me</span>
                                                    </label>

                                                    <button type="submit" class="width-35 pull-right btn btn-sm btn-primary">
                                                        <i class="ace-icon fa fa-key"></i>
                                                        <span class="bigger-110">Login</span>
                                                    </button>
                                                </div>

                                                <div class="space-4"></div>
                                            </fieldset>
                                            </form>


                                        <div class="space-6"></div>


                                    </div><!-- /.widget-main -->

                                    <div class="toolbar clearfix">
                                        <div>
                                            <a href="#" data-target="#forgot-box" class="forgot-password-link">
                                                <i class="ace-icon fa fa-arrow-left"></i>
                                                I forgot my password
                                            </a>
                                        </div>

                                        <div>
                                            <a href="#" data-target="#signup-box" class="user-signup-link">
                                                I want to register
                                                <i class="ace-icon fa fa-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div><!-- /.widget-body -->
                            </div><!-- /.login-box -->

                        </div><!-- /.position-relative -->
                    </div>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.main-content -->
        </div><!-- /.main-container -->

    <!-- basic scripts -->

    <!--[if !IE]> -->
    <script src="<?php echo base_url('aceadmin/assets/js/jquery-2.1.4.min.js');?>"></script>

    <!-- <![endif]-->

    <!--[if IE]>
<script src="assets/js/jquery-1.11.3.min.js"></script>
<![endif]-->
    <script type="text/javascript">
        if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
    </script>

    <!-- inline scripts related to this page -->
    <script type="text/javascript">
        jQuery(function($) {
            $(document).on('click', '.toolbar a[data-target]', function(e) {
                e.preventDefault();
                var target = $(this).data('target');
                $('.widget-box.visible').removeClass('visible');//hide others
                $(target).addClass('visible');//show target
            });
        });
    </script>
    </body>
</html>
