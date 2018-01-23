function formsubmit(formEl){
  let dateEl = formEl.elements['Datum']
  let beginEl = formEl.elements['BeginnE']
  let casesEl = formEl.elements['AnzahlKoffer']
  let teacherEl = formEl.elements['LehrerKzl']
  let classEl = formEl.elements['Klasse']

  let json = {}
  json[dateEl.name] = dateEl.value
  json[beginEl.name] = parseInt(beginEl.value)
  json[casesEl.name] = parseInt(casesEl.value)
  json[teacherEl.name] = teacherEl.value
  json[classEl.name] = classEl.value

  let httpReq = new XMLHttpRequest()
  httpReq.open("POST", "/api/save")
  httpReq.setRequestHeader('Content-Type', 'application/json')
  httpReq.onload = function() {
    console.log('hurra, respons from server received')
    console.log(this.responseText)

    if (this.status!=200) {
      console.log('Error status: '+this.status)
      let errData = JSON.parse(this.responseText)
      console.log(errData)
      let errText = errData['userdesc']
      //------------------------------------------------------------------------Alert
      alert(errText) //Alert, damit sichergestellt ist, dass der Benutzer mitbekommt, dass es schief gegangen ist.
      //------------------------------------------------------------------------End of Alert
    } else {
      let resData = JSON.parse(this.responseText)
      console.log(resData)
      let userText
      if(resData['data'].length > 1){
        userText = ''+resData['data'] + ' wurden Ihnen zugewiesen.'
      }else {
        userText = ''+resData['data'] + ' wurde Ihnen zugewiesen.'
      }
      let options = {
        body: userText,
        icon: '/Images/HTL-Logo.png'
      };
      //------------------------------------------------------------------------Notification
        if (!("Notification" in window)) {
          alert(userText);
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification('Gespeichert',options);
        }
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
          Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              var notification = new Notification('Gespeichert',options);
            }
          })
        }
        //----------------------------------------------------------------------End of Notification
    }
  }
  httpReq.onerror = function() {
    console.log('WTF?')
  }
  httpReq.send(JSON.stringify(json))
}
