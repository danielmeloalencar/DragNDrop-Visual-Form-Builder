export default class AssistantBuilder {
  constructor(container, json = null, moveable = true) {
    this.json = json;
    this.moveable = moveable;
    this.events = {};
    this.container = '#' + container;
  }

  start() {
    console.log("Visual Assistant Started Successfully.");

    let template = `<div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ui-draggable-handle">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       TESTE
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>`;

    document.querySelector(this.container).insertAdjacentHTML('beforeend', template);
    var Modal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
      keyboard: false
    })

    Modal.show();
    this.dispatch('start');  
  }







 /* Events */
 on (event, callback) {
  // Check if the callback is not a function
  if (typeof callback !== 'function') {
      console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
      return false;
  }


  // Check if the event is not a string
  if (typeof event !== 'string') {
      console.error(`The event name must be a string, the given type is ${typeof event}`);
      return false;
  }

  // Check if this event not exists
  if (this.events[event] === undefined) {
      this.events[event] = {
          listeners: []
      }
  }

  this.events[event].listeners.push(callback);

}
removeListener (event, callback) {
  // Check if this event not exists
  if (this.events[event] === undefined) {
      //console.error(`This event: ${event} does not exist`);
      return false;
  }

this.events[event].listeners = this.events[event].listeners.filter(listener => {
    return listener.toString() !== callback.toString();
});
}

dispatch (event, details) {
  // Check if this event not exists
  if (this.events[event] === undefined) {


      console.error(`This event: ${event} does not exist`);
      return false;
  }

  this.events[event].listeners.forEach((listener) => {
      listener(details);
  });
}

}
