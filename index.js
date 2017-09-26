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

$(document).ready(function(){
    load();

    //highlight whats happening now
    setInterval(highlight_current_activity,500);

    $('button').click(function(){
    });
    
});

function highlight_current_activity()
{
    obj_timetable.highlight_current_activity();
}

function load()
{
    echo(">>Starting Loading Entries");
    echo("------------------------");
 
    obj_entries = new Entries();
    //Entry(title, days, time, duration, relative_time, relative_to, till, relative_to_till
    
    obj_entry = new Entry("Masjid Time 1","Sun,Mon,Tue,Wed,Thu,Sat",null,60,null,"Isha",null,null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Home Taleem","All",null,15,null,"Masjid Time 1",null,null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Remaining Nimaaz","All",null,15,null,"Home Taleem",null,null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Free Time 1","All",null,20,null,"Remaining Nimaaz",null,null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Sleep","All",null,null,null,"Free Time 1","Fajr",null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Zikar To Sunrise (Masjid Time)","All",null,null,null,"Fajr","Sunrise",null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Breakfast","All",null,20,null,"Sunrise",null,null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Exercise","Sun,Mon,Tue,Wed,Thu",null,15,null,"Breakfast",null,null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry("Bath","All","Sun,Mon,Tue,Wed,Thu",15,null,"Exercise",null,null);
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry();
    obj_entry.title = "Get Ready";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = 30;
    obj_entry.relative_time = null;
    obj_entry.relative_to = "Bath";
    obj_entry.till = null;
    obj_entry.relative_to_till = null;
    obj_entries.add(obj_entry);
    delete obj_entry;


    obj_entry = new Entry();
    obj_entry.title = "Dunya 1";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = null;
    obj_entry.relative_time = null;
    obj_entry.relative_to = "Get Ready";
    obj_entry.till = "Zuhur";
    obj_entry.relative_to_till = -20;
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry();
    obj_entry.title = "Freetime 2";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = null;
    obj_entry.relative_time = null;
    obj_entry.relative_to = "Dunya 1";
    obj_entry.till = "Zuhur";
    obj_entry.relative_to_till = null;
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry();
    obj_entry.title = "Dunya 2";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = null;
    obj_entry.relative_time = null;
    obj_entry.relative_to = "Zuhur";
    obj_entry.till = "Asr";
    obj_entry.relative_to_till = null;
    obj_entries.add(obj_entry);
    delete obj_entry;

    obj_entry = new Entry();
    obj_entry.title = "Dunya 3";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = null;
    obj_entry.relative_to = "Asr";
    obj_entry.relative_time = null;
    obj_entry.till = "Magrib"; 
    obj_entry.relative_to_till = -90;
    obj_entries.add(obj_entry);
    delete obj_entry;

    // add freetime after dunya 20
    obj_entry = new Entry();
    obj_entry.title = "Freetime 3";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = 20;
    obj_entry.relative_to = "Dunya 3";
    obj_entry.relative_time = null;
    obj_entry.till = null; 
    obj_entry.relative_to_till = null;
    obj_entries.add(obj_entry);
    delete obj_entry;

    // add food time after freetime 30
    obj_entry = new Entry();
    obj_entry.title = "Dinner";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = 30;
    obj_entry.relative_to = "Freetime 3";
    obj_entry.relative_time = null;
    obj_entry.till = null; 
    obj_entry.relative_to_till = null;
    obj_entries.add(obj_entry);
    delete obj_entry;

    // add Zikar & Quran  (Masjid Time) till Magrib
    obj_entry = new Entry();
    obj_entry.title = "Zikar & Quran  (Masjid Time)";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = null;
    obj_entry.relative_to = "Dinner";
    obj_entry.relative_time = null;
    obj_entry.till = "Magrib"; 
    obj_entry.relative_to_till = null;
    obj_entries.add(obj_entry);
    delete obj_entry;

    // add Miasjid time from Magrib to Isha
    obj_entry = new Entry();
    obj_entry.title = "Masjid Time";
    obj_entry.days = "Sun,Mon,Tue,Wed,Thu";
    obj_entry.time = null;
    obj_entry.duration = null;
    obj_entry.relative_to = "Magrib";
    obj_entry.relative_time = null;
    obj_entry.till = "Isha"; //it thinks isha for previous day
    obj_entry.relative_to_till = null;
    obj_entries.add(obj_entry);
    delete obj_entry;


    //HIKMAT
    //papa given self esteem wasnot based on absolute knowledge
    //paga based life goals aspirations and he think one whould be like him is the same as above
    //if earning takes me in ghaflat, not earing is not bigger ghaflat
    //socho gay kay nahiin ho a to kabhi nahiin hoga
    //mahmeed gaznawi made 17 attacks
    


    // add remaining sleep after rest 

    

    // add masjid time till 1 hour after isha ( will automatically include 40 min b4 magrib)

    //createand show timetable for given date from the entries
    var m_date = moment();
    m_date.add(2,"day");
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



