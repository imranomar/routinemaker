//GLOBAL VARIABLES



var lat = 25.346255;
var lng = 55.420932;
var start_time = '09-07-2017 04:08';
var width_of_slots_multiple = 1;
var max_slot_length = 100;
var format = 'HH:mm'; //24 hours clock cannot be used as we have next day issues;
var format_with_date = '"MM-DD-YYYY HH:mm'; //24 hours clock cannot be used as we have next day issues;
var fajr = '';
var zuhur = '';
var asr = ''; 
var magrib = '';
var isha = '';
var sunrise = '';
var arr_entries = new Array();
var arr_prayers = new Array();
var obj_entries;
var obj_timetable;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
    
    
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );

    
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit'],             // buttonLabels
        'Jane Doe'                 // defaultText
    );

    navigator.notification.beep(2);
}

function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}


function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

function alertDismissed()
{
    alert('js alert: you dimissed notification.alert');
}

$(document).ready(function(){
    
    window.onerror = function(message, source, lineno, colno, error) {
       

         // You can view the information in an alert to see things working like this:
         //alert("Error: " + message + "\nurl: " + source + "\nline: " + lineno + colno + error);
        
    };
    

    load();

    //highlight whats happening now
    //setInterval(highlight_current_activity,3000);

    $('button').click(function(){
    });
    
});

function highlight_current_activity()
{
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
    
    
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );

    
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit'],             // buttonLabels
        'Jane Doe'                 // defaultText
    );

    navigator.notification.beep(2);
    obj_timetable.highlight_current_activity();
}

function load()
{
    echo(">>Starting Loading Entries");
    echo("------------------------");
 
    obj_entries = new Entries();

    // Types: Dunya, Deen, Sleep, Free, Health, Prayer
    
    //Dinner - 25 minutes
    obj_entry = new Entry();
    obj_entry.title = "Dinner";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 25;
    obj_entry.relative_to = "Isha";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Food";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Walk - 15 minutes
    obj_entry = new Entry();
    obj_entry.title = "Walk";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 15;
    obj_entry.relative_to = "Dinner";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Health";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Dinner - 12 minutes
    obj_entry = new Entry();
    obj_entry.title = "Remaining Prayer";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 12;
    obj_entry.relative_to = "Walk";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Prayer";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Dinner - 12 minutes
    obj_entry = new Entry();
    obj_entry.title = "Taleem";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 10;
    obj_entry.relative_to = "Remaining Prayer";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Deen";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Dinner - 10 minutes
    obj_entry = new Entry();
    obj_entry.title = "Quran";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 5;
    obj_entry.relative_to = "Taleem";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Deen";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Sleep
    obj_entry = new Entry();
    obj_entry.title = "Sleep";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = null;
    obj_entry.relative_to = "Quran";
    obj_entry.relative_time = null;
    obj_entry.till = "Fajr" ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Sleep";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Zikar
    obj_entry = new Entry();
    obj_entry.title = "Zikar";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 20;
    obj_entry.relative_to = "Fajr";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Deen";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Quran
    obj_entry = new Entry();
    obj_entry.title = "Quran 2";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 10;
    obj_entry.relative_to = "Zikar";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Deen";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Walk 2
    obj_entry = new Entry();
    obj_entry.title = "Walk 2";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 15;
    obj_entry.relative_to = "Quran 2";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Health";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Bath
    obj_entry = new Entry();
    obj_entry.title = "Bath";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 15;
    obj_entry.relative_to = "Walk 2";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Health";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Breakfast
    obj_entry = new Entry();
    obj_entry.title = "Breakfast";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 15;
    obj_entry.relative_to = "Bath";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Food";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Yaseen
    obj_entry = new Entry();
    obj_entry.title = "Yaseen";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 15;
    obj_entry.relative_to = "Breakfast";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Deen";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Iron Clothes
    obj_entry = new Entry();
    obj_entry.title = "Iron Clothes";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 15;
    obj_entry.relative_to = "Yaseen";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Other";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Travel to Office
    obj_entry = new Entry();
    obj_entry.title = "Travel to Office";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 40;
    obj_entry.relative_to = "Iron Clothes";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Other";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Office 1
    obj_entry = new Entry();
    obj_entry.title = "Office 1";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = null;
    obj_entry.relative_to = "Travel to Office";
    obj_entry.relative_time = null;
    obj_entry.till = "Zuhur" ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Dunya";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Lunch
    obj_entry = new Entry();
    obj_entry.title = "Lunch";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 15;
    obj_entry.relative_to = "Zuhur";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Food";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Sleep 2
    obj_entry = new Entry();
    obj_entry.title = "Sleep 2";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 30;
    obj_entry.relative_to = "Lunch";
    obj_entry.relative_time = null;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Sleep";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Office 2
    obj_entry = new Entry();
    obj_entry.title = "Office 2";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = null;
    obj_entry.relative_to = "Sleep 2";
    obj_entry.relative_time = null;
    obj_entry.till = "Asr" ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Dunya";
    obj_entries.add(obj_entry);
    delete obj_entry;

     //Zikar 2
     obj_entry = new Entry();
     obj_entry.title = "Zikar 2";
     obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
     obj_entry.time = null ;
     obj_entry.duration = 25;
     obj_entry.relative_to = "Office 2";
     obj_entry.relative_time = null;
     obj_entry.till = null ; 
     obj_entry.relative_to_till = null;
     obj_entry.type = "Deen";
     obj_entries.add(obj_entry);
     delete obj_entry;

    //Office 3
    obj_entry = new Entry();
    obj_entry.title = "Office 3";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = null;
    obj_entry.relative_to = "Zikar 2";
    obj_entry.relative_time = null;
    obj_entry.till = "Magrib" ; 
    obj_entry.relative_to_till = -30;
    obj_entry.type = "Dunya";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Travel to muwailah
    obj_entry = new Entry();
    obj_entry.title = "Travel to muwailah";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = null;
    obj_entry.relative_to = "Isha";
    obj_entry.relative_time = -30;
    obj_entry.till = null ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Other";
    obj_entries.add(obj_entry);
    delete obj_entry;

    //Leave for home
    obj_entry = new Entry();
    obj_entry.title = "Leave for home";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu,Sat";
    obj_entry.time = null ;
    obj_entry.duration = 30;
    obj_entry.relative_to = "Office 3";
    obj_entry.relative_time = null;
    obj_entry.till = "Magrib" ; 
    obj_entry.relative_to_till = null;
    obj_entry.type = "Other";
    obj_entries.add(obj_entry);
    delete obj_entry;



    //HIKMAT
    //papa given self esteem wasnot based on absolute knowledge
    //papa based life goals aspirations and he think one whould be like him is the same as above
    //if earning takes me in ghaflat, not earing is not bigger ghaflat
    //socho gay kay nahiin ho a to kabhi nahiin hoga
    //mahmeed gaznawi made 17 attacks

    // add remaining sleep after rest 

    // add masjid time till 1 hour after isha ( will automatically include 40 min b4 magrib)

    //createand show timetable for given date from the entries
    var m_date = moment();
    obj_timetable = new Timetable(m_date.toDate(),obj_entries);
    obj_timetable.draw();
}



function is_in_between(test,before,after)
{
    //echo("before:"+ before.format("MM-DD-YYYY HH:mm"));
    //echo("test:"+ test.format("MM-DD-YYYY HH:mm"));
    //echo("after:"+ after.format("MM-DD-YYYY HH:mm"));
    if (test.isBetween(before, after, null, '(]')) 
    {
      return true;
    } else {
      return false;
    }
}

function echo(string)
{
    console.log(string);
}



