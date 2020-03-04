
import React, { Component } from "react";

function Modal() {
return (
  <div>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCart">Launch modal</button>
<div className="modal fade" id="modalPush" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div className="modal-dialog modal-notify modal-info" role="document">

    <div className="modal-content text-center">

      <div className="modal-header d-flex justify-content-center">
        <p className="heading">Be always up to date</p>
      </div>
      <div className="modal-body">

        <i className="fas fa-bell fa-4x animated rotateIn mb-4"></i>

        <p>Do you want to receive the push notification about the newest posts?</p>

      </div>


      <div className="modal-footer flex-center">
        <a href="https://mdbootstrap.com/products/jquery-ui-kit/" className="btn btn-info">Yes</a>
        <a type="button" className="btn btn-outline-info waves-effect" data-dismiss="modal">No</a>
      </div>
    </div>

  </div>
</div>
</div>);
}

export default Modal;
