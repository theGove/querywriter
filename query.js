let DIAGRAM = null
function d(evt){
    // diagram click.  It's name is short to keep the size of the svg small
   // console.log(evt.target.parentElement.parentElement.firstElementChild.width.baseVal.value, id)
    const mask=evt.target.parentElement.parentElement.firstElementChild
    const y = mask.y.baseVal.value
    
    let elem=evt.target
    console.log("elem",elem.tagName, elem.className)
    while (!(elem.tagName === 'g' && elem.className.baseVal==="dd")){
        elem=elem.parentElement
        console.log("elem",elem.tagName, elem.className)
    }
    //elem=elem.firstElementChild
    
    console.log("elem",elem)
    const title = atob(elem.dataset.title)
    const note = atob(elem.dataset.text)
    const note_width = parseFloat(elem.dataset.width)-8
    console.log("note_width", note_width)
  
  
    elem=evt.target
    while (elem.tagName !== "svg"){
        elem=elem.parentElement
    }
  
  
    for(const part of elem.querySelectorAll(".added-svg")){
        part.remove()
    }
  
  
    console.log(elem.width.baseVal.value)
    const image_width = elem.width.baseVal.value
    const image_height = elem.height.baseVal.value
    const mask_left = mask.x.baseVal.value
    const mask_right = mask_left + mask.width.baseVal.value
    
    const lines = note.split("\n")
    const header_text_size=8
    const line_spacing=12
    //const padding_top=1
    const padding_bottom=2
    const padding_left=4
    const row_height = mask.height.baseVal.value
    const border=1.3
    const corner_radius = 4
    const arrow_width=10
    const title_height=12
    const note_height=line_spacing*lines.length+padding_bottom
    const height=note_height+title_height+2*border
    const width=note_width+border*2
    
    let top=y-(height/2)+row_height-5
    
    if(top<2){
      top=2
    }else if(top + height + 4 > image_height){
        top=image_height-height-4
    }
  
    let left=mask_right+arrow_width-1
    let arrow_points=`${mask_right+2},${y+(row_height/2)} ${mask_right+arrow_width},${y+(row_height/2)-4} ${mask_right+arrow_width},${y+(row_height/2)+4}`
    if(left+width > image_width){
        left=mask_left-arrow_width-width-1
        arrow_points=`${mask_left-2},${y+(row_height/2)} ${mask_left-arrow_width},${y+(row_height/2)-4} ${mask_left-arrow_width},${y+(row_height/2)+4}`
    }
    
    
    let shp
  
    shp = document.createElementNS('http://www.w3.org/2000/svg','polygon');  
    shp.setAttribute('fill', 'darkgreen');
    shp.classList.add('added-svg');
    shp.classList.add('added-svg');
    shp.setAttribute('points',arrow_points);
    shp.setAttribute('style',"fill:darkgreen;stroke:none;");
    elem.appendChild(shp);
   
    shp = document.createElementNS('http://www.w3.org/2000/svg','rect');
    shp.setAttribute('fill', 'darkgreen');
    shp.classList.add('added-svg');
    shp.setAttribute('y',top);
    shp.setAttribute('x',left);
    shp.setAttribute('rx',corner_radius);
    shp.setAttribute('height',height+(border*2));
    shp.setAttribute('width',width+(border*2));
    elem.appendChild(shp);
  
    shp = document.createElementNS('http://www.w3.org/2000/svg','rect');
    shp.setAttribute('fill', 'white');
    shp.classList.add('added-svg');
    shp.setAttribute('y',top+border+title_height);
    shp.setAttribute('x',left+border);
    shp.setAttribute('rx',corner_radius-1);
    shp.setAttribute('height',height-title_height);
    shp.setAttribute('width',width);
    elem.appendChild(shp);
  
    shp = document.createElementNS('http://www.w3.org/2000/svg','rect');
    shp.setAttribute('fill', 'white');
    shp.classList.add('added-svg');
    shp.setAttribute('y',top+border+title_height);
    shp.setAttribute('x',left+border);
    shp.setAttribute('height',corner_radius);
    shp.setAttribute('width',width);
    elem.appendChild(shp);
  
  
    shp = document.createElementNS('http://www.w3.org/2000/svg','text');
    shp.setAttribute('fill', 'white');
    shp.classList.add('added-svg');
    shp.classList.add('note-head');
    shp.setAttribute('y',top+border+header_text_size);
    shp.setAttribute('x',left + border +padding_left);
    shp.innerHTML=title
    elem.appendChild(shp);
    
    
    for(let x=0;x<lines.length;x++){
        
        shp = document.createElementNS('http://www.w3.org/2000/svg','text');
        shp.setAttribute('fill', '#444');
        shp.classList.add('added-svg');
        shp.classList.add('note-text');
        shp.setAttribute('y',top+border+title_height+((1+x)*line_spacing));
        shp.setAttribute('x',left + border+padding_left);
        shp.innerHTML=lines[x]
        elem.appendChild(shp);
    }
  
    shp = document.createElementNS('http://www.w3.org/2000/svg','circle');
    shp.setAttribute('fill', 'darkgreen');
    shp.classList.add('added-svg');
    shp.setAttribute('cy',top+border+6);
    shp.setAttribute('cx',left + width - border -5);
    shp.setAttribute('r',5);
    shp.setAttribute('cursor',"pointer");
    shp.setAttribute('onclick','close_note(event)')
    elem.appendChild(shp);
  
    shp = document.createElementNS('http://www.w3.org/2000/svg','text');
    shp.setAttribute('fill', 'white');
    shp.classList.add('added-svg');
    shp.setAttribute('y',top+border+header_text_size+1);
    shp.setAttribute('x',left + width - border -8);
    shp.setAttribute('font-size',9);
    shp.setAttribute('cursor',"pointer");
    shp.setAttribute('font-weight',"bold");
    shp.setAttribute('onclick','close_note(event)')
    shp.innerHTML="X"
    elem.appendChild(shp);
  
  
  }
  
  
  function close_note(evt){// for working with svg diagrams.  closes any open data dictionary speech bubbles
    console.log(evt)
    let elem=evt.target
    while (elem.tagName !== "svg"){
        console.log(elem)
        elem=elem.parentElement
    }
    for(const part of elem.querySelectorAll(".added-svg")){
        part.remove()
    }
  
  }
  
  function svg_diagram_click(evt){
    // send data to modify query
    close_note(evt)
    let elem=evt.target
    while(elem.className !=="query-diagram"){
      elem=elem.parentElement
    }
    console.log(evt.target.dataset.fragment, evt.target.dataset.kind)
    amend_sql_worker(evt.target.dataset.fragment, evt.target.dataset.kind,evt.ctrlKey )
  
  }

  function amend_sql_worker(fragment, kind, ctrlKey) {
    console.log("ta", DIAGRAM)
    
    if(!DIAGRAM){
        DIAGRAM = {sql:document.getElementById("query")}
    }
    // check to see if the query is empty, if so, we are resetting the query
    if (DIAGRAM.sql.value.trim().length === 0) {
      //reset the query
      DIAGRAM.history = []
      DIAGRAM.history_position = 0
      DIAGRAM.query = { select: [], from: [], tables: [] }
    }
  
    if (!(DIAGRAM.sql.value.trim() === get_local_sql())) {
      // insert the item a the appropriate place in the edited query
      if(kind==="table"){
        if(!ctrlKey){
          // only insert tablename if ctrl key is down
          const data=fragment.split(".")
          fragment = data[data.length-1]
        }
        //if(shiftKey){
          // prepend a space an a comma if shift key isdown
          fragment = ", "+fragment
        //}
  
      }
      DIAGRAM.sql.setRangeText(fragment, DIAGRAM.sql.selectionStart, DIAGRAM.sql.selectionEnd, 'select');
      const pos = DIAGRAM.sql.selectionStart + fragment.length
      DIAGRAM.sql.setSelectionRange(pos, pos);
  
      DIAGRAM.sql.focus()
      return
    }
  
    // we are in full build mode
    let msg = ""
    if (fragment.indexOf(".") === -1) {
      // we have a table only
      msg = add_field(fragment, "*")
      if (msg) {
        message({
          message: msg,
          title: "Problem Building SQL",
          seconds: 4,
          kind: "error",
          show: true
        })
      return
      }
    } else if (fragment.indexOf(" JOIN ") === -1) {
      // we have a dot in in the title and no join, it must be a field
      //log("trying to add a field")
      msg = add_field(fragment.split(".")[0], fragment.split(".")[1])
      if (msg) {
        message({
          message: msg,
          title: "Problem Building SQL",
          seconds: 4,
          kind: "error",
          show: true
        })
      return
      }
  
    } else {
      // atom is a link
      // find the talbes in the link
      let temp = fragment.replace(" JOIN ", " ").split(" ")
      let match_count = 0
      let table_to_add
      const table1 = temp[0]
      const table2 = temp[1]
  
      if (DIAGRAM.query.tables.length === 0) {
        // query is empty, configure from scratch
        msg = add_field(table1, "*")
        if (msg) {
          message({
            message: msg,
            title: "Problem Building SQL",
            seconds: 4,
            kind: "error",
            show: true
          })
          return
        }
        // now get ready to add the join clause
        let frag = fragment.split(" ON ")[1]
        //log("frag",frag)
        // push the rest into the next entry
        DIAGRAM.query.from.push("  JOIN  " + table2 + "\n    ON  " + frag)
        DIAGRAM.query.tables.push(table2)
  
      } else {
        //there is already a table in the query.  need to check to see if atom join makes sense
        for (const tname of DIAGRAM.query.tables) {
          if (tname === table1) {
            match_count++
            //log(tname, "is already in the query")
            table_to_add = table2
          }
          if (tname === table2) {
            match_count++
            //log(tname, "is already in the query")
            table_to_add = table1
          }
        }
        //log("table_to_add",table_to_add)
        if (match_count === 0) {
          message({
            message: 'Neither "' + table1 + '" nor "' + table2 + '" is already in the query, so we cannot add the selected join.',
            title: "Problem Building SQL",
            seconds: 4,
            kind: "error",
            show: true
          })
  
          
        } else if (match_count === 1) {
          //log("ready to add", fragment)
          DIAGRAM.query.from.push("  JOIN  " + table_to_add + "\n    ON  " + fragment.split(" ON ")[1].replace(/ AND /g, '\n    AND '))
          DIAGRAM.query.tables.push(table_to_add)
        } else {
          message({
            message: 'Both "' + table1 + '" and "' + table2 + '" are already in the query, so we cannot add the selected join.',
            title: "Problem Building SQL",
            seconds: 4,
            kind: "error",
            show: true
          })
  
        }
      }
    }
  
    // you always wanted to be able to change history, now you can
    if (DIAGRAM.history_position < DIAGRAM.history.length - 1) { DIAGRAM.history.splice(DIAGRAM.history_position + 1) }   // get rid of old history     
  
    if (JSON.stringify(DIAGRAM.query) !== DIAGRAM.history[DIAGRAM.history.length - 1]) {
      DIAGRAM.history.push(JSON.stringify(DIAGRAM.query))
      DIAGRAM.history_position = DIAGRAM.history.length - 1
    }
  
    write_query()
  
    return false;
  }

  function get_local_sql() {
    let local_sql = "SELECT  "
    //log("query",query)
    // write out the query
    for (let x = 0; x < DIAGRAM.query.select.length; x++) {
      if (x > 0) { local_sql += "\n        ," }
      if (DIAGRAM.query.select[x].indexOf(".") === -1) {
        local_sql += DIAGRAM.query.select[x]  // there is no prefix, show the whole thing.   should only happen when value is "*"
      } else if (DIAGRAM.query.tables.length === 1) {
        local_sql += DIAGRAM.query.select[x].split(".")[1]// there is only one table, no need to prefix
      } else {
        local_sql += DIAGRAM.query.select[x]// multiple tables, let's add prefixes
      }
    }
    for (let x = 0; x < DIAGRAM.query.from.length; x++) {
      local_sql += "\n"
      if (x === 0) { local_sql += "FROM    " }
      local_sql += DIAGRAM.query.from[x]
    }
  
    if (local_sql.trim() == "SELECT") {
      return ""
    }
    return local_sql
  }
  
  function write_query(id) {
    DIAGRAM.sql.value = get_local_sql(id)
    
  }
  
  function add_field( table, field) {
    //log("table",table)
    //log("field",field)
    
    if (DIAGRAM.query.select.indexOf(table + "." + field) > -1) { return }
    if (DIAGRAM.query.tables.length === 0) {
      //query is empty, just build the query
      DIAGRAM.query.select.push(table + "." + field)
      DIAGRAM.query.tables.push(table)
      DIAGRAM.query.from.push(table)
      return
    } else if (DIAGRAM.query.tables.indexOf(table) === -1) {
      // query already has some data and the table specified is nit in the list of tables, can't add field
      return "Cannot add table to query.  Try clicking ON a link instead."
    } else if (field === "*") {
      // we already have 
      return "Cannot add table to query.  Try clicking ON a field instead."
    } else if (DIAGRAM.query.select.length === 1 && DIAGRAM.query.select[0] === "*") {
      // there is currently only one field, and it is start.  neex to replace
      DIAGRAM.query.select[0] = table + "." + field
    } else {
      // must have been a field in one of the tables in the query
      //if we already have a *, get shod of it
      if (DIAGRAM.query.select.length === 1 && DIAGRAM.query.select[0].substr(DIAGRAM.query.select[0].length - 2, 2) === ".*") { DIAGRAM.query.select.shift() }
      DIAGRAM.query.select.push(table + "." + field)
    }
  }
  
  
  
  function clear_sql(id) {
    DIAGRAM.sql.value = ""
    DIAGRAM.query.select = []
    DIAGRAM.query.from = []
    DIAGRAM.query.tables = []
  }

  function message(params){
    alert(params.message)
  }