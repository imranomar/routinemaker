class Timetable
{
    constructor(obj_date,obj_entries)
    {
        echo("Timetable>Constructor")
        this.obj_date = obj_date;
        this.obj_prayers = new Prayers(obj_date);
        this.obj_entries = obj_entries;
        this.output='';
        var prayer;
        var tmp_entry;

        //add prayer timings as entries
        //Entry(title,days,time,duration,relative_time,relative_to,till,relative_to_till)
        var i;
        for(i=0;i<=this.obj_prayers.arr_prayers.length-1;i++)
        {
            prayer = this.obj_prayers.arr_prayers[i];
            tmp_entry = new Entry(prayer.title,"All",prayer.time,prayer.duration,null,null,null,null);
            tmp_entry.m_start = prayer.m_start.clone();
            tmp_entry.type = "Prayer";
            this.obj_entries.add(tmp_entry);
        }
    }

    draw()
    {
        echo("Timetable>draw")   
        this.calculate_times();
        this.obj_entries.sort();
        var i=0;
        var count = this.obj_entries.arr_entries.length;
        var entry;
        var duration;
        var m_tmp;
        var total_dunya_time=0;
        var total_deen_time=0;
        var total_sleep_time=0;
        var total_free_time=0;
        var total_health_time=0;
        var total_prayer_time=0;
        var minutes;
        var hours;
        var humanized;
        var day_of_week
        var type;
        
        
        var tmp_m_date = moment(this.obj_date);
        $('h1').html('Rountine Maker '+ " <h2>" + tmp_m_date.format('ddd-MMM-YYYY')+ "</h2>");

        this.append("<table class='table' width='0%' >");
        
        for(i=0;i<=count-1;i++)
        {
            entry = this.obj_entries.arr_entries[i];

            //skip entry if not for day timetable is being created for
            m_tmp = moment(this.obj_date.toISOString());
            day_of_week = m_tmp.format("ddd");
            if(entry.days.toUpperCase()!="ALL" )
            {
                if(!entry.days.includes(day_of_week))
                {
                    continue; //do not draw 
                }
            }

            //calculate ending time of entry
            duration = entry.duration;
            m_tmp = entry.m_start.clone();
            m_tmp.add(duration,"minutes");
  
            type = ''; //reset for loop
            //calculate total dunya time
            if(entry.type=="Dunya")
            {
                total_dunya_time = total_dunya_time + entry.duration;
            }
            else if(entry.type=="Deen")
            {
                total_deen_time = total_deen_time + entry.duration;
            }
            //calculate total dunya time
            else if(entry.type=="Sleep")
            {
                total_sleep_time = total_sleep_time + entry.duration;
            }
            //calculate total dunya time
            else if(entry.type=="Free")
            {
                total_free_time = total_free_time + entry.duration;
            }
            else if(entry.type=="Health")
            {
                total_health_time = total_health_time + entry.duration;
            }
            else if(entry.type=="Prayer")
            {
                total_prayer_time = total_prayer_time + entry.duration;
            }
            else
            {
                type = "other";
            }

            //duration humanized into hours and minutes
           
            
            humanized =  this.humanize(entry.duration);
            this.append("<tr><td id='"+entry.title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')+"'>" +entry.title + "</td><td><span class='badge green'>"+ entry.m_start.format("hh:mma")+  "</span> - <span  class='badge green'>" + entry.m_start.add(entry.duration,"minutes").format("hh:mma") + "</span>");
            
            if (entry.type=="Deen")
            {
                this.append("&nbsp;<span class='badge'>"+humanized+"</span></td>");
            }
            else if (entry.type=="Sleep")
            {
                this.append("&nbsp;<span class='badge grey'>"+humanized+"</span></td>");
            }
            else if (entry.type=="Free")
            {
                this.append("&nbsp;<span class='badge red'>"+humanized+"</span></td>");
            }
            else if (entry.type=="Prayer")
            {
                this.append("&nbsp;<span class='badge purple'>"+humanized+"</span></td>");
            }
            else if (entry.type=="Travel")
            {
                this.append("&nbsp;<span class='badge black'>"+humanized+"</span></td>");
            }
            else if (entry.type=="Eat")
            {
                this.append("&nbsp;<span class='badge blue lighten-4 '>"+humanized+"</span></td>");
            }
            else if (entry.type=="Health")
            {
                this.append("&nbsp;<span class='badge deep-purple accent-1'>"+humanized+"</span></td>");
            }
            else
            {
                this.append("&nbsp;<span class='badge orange'>"+humanized+"</span></td>");
            }
            

            //  
        }
        this.append("</table>");
        this.append("<small>");
        this.append("<br>Total Dunya Time:"+this.humanize(total_dunya_time));
        this.append("<br>Total Prayer Time:"+this.humanize(total_prayer_time));
        this.append("<br>Total Deen Time:"+this.humanize(total_deen_time));
        this.append("<br>Total Sleep Time:"+this.humanize(total_sleep_time));
        this.append("<br>Total Health Time:"+this.humanize(total_health_time));
        this.append("<br>Total Free Time:"+this.humanize(total_free_time));
        
        this.append("<br>Total Other:"+this.humanize((1440-total_free_time-total_dunya_time-total_deen_time-total_sleep_time)));
        this.append("</small>");
       // this.append("<br>Total Dunya starts at "+this.obj_entries.arr_entries[this.obj_entries.find("Dunya 1")].m_start.format("hh:mma")); //i gives error if no dunya object found


        // this.append("<br><br>");
        // for(i=0;i<=this.obj_prayers.arr_prayers.length-1;i++)
        // {
        //     this.append(this.obj_prayers.arr_prayers[i].title +" at " +this.obj_prayers.arr_prayers[i].m_start.format("hh:mma") +  "<br>");
        // }

        $('.output').html(this.output);
    
    }

    append(str)
    {
        this.output = this.output + str;
    }

    highlight_current_activity()
    {
        
        var i=0;
        var count = this.obj_entries.arr_entries.length;
        var entry;
        var m_now;
        var j_element_now;


        var tmp_end_moment ;
        // var m_start;
        // var relative_time = 0;
        // var duration;
        // var obj_entry_till;
       
        for(i=0;i<=count-1;i++)
        {
            entry = this.obj_entries.arr_entries[i];
            //get the moment of ending time of entry
            tmp_end_moment = entry.m_start.clone();
           

            tmp_end_moment.add(entry.duration,"minutes");
            tmp_end_moment.date(entry.m_start.date());

            //get the time now and also set the date to be same as the entry we are comparing to
            //cause entried after 12:00am are entered for tomorrow's date
            m_now = moment();
            m_now.date(entry.m_start.date());
        
            echo("x"+m_now.format("MM-DD-YYYY hh:mma"));
            echo("y "+entry.title+" " +entry.m_start.format("MM-DD-YYYY hh:mma"));
            echo("z"+tmp_end_moment.format("MM-DD-YYYY hh:mma"));
            if(m_now.isBetween(entry.m_start, tmp_end_moment))
            {
                    //alert(entry.title);
                    //alert($('#' + entry.title).id);
                    //alert($('#' + entry.title).html());
                    j_element_now = $('#' + entry.title.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-'));
                    j_element_now.css('background-color','#f108ac');
                    j_element_now.css('border-radius','8px');
                    j_element_now.css('padding','6px');
                    j_element_now.css('color','white');
                    j_element_now.css('font-weight','bold');
                    // /;border-radius: 8px;padding: 6px;color: white;font-weight: bold;
                    $(window).scrollTop(j_element_now.offset().top - 100);              
                }
           

        }
    }

    //duration in minutes
    humanize(duration)
    {
        var humanized;
        var minutes;
        var hours;
        minutes = duration % 60;
        hours = (duration-minutes)/60;
        if(hours>0)
        {
            humanized = hours.toString() + " hrs " + (minutes<10?"0":"") + minutes.toString() + " min";
        }
        else
        {
            humanized =  (minutes<10?"0":"") + minutes.toString() + " min";
        }

        return humanized;
    }

    calculate_times()
    {
        echo("Timetable>Calculate Times");
        var i=0;
        var count = this.obj_entries.arr_entries.length;
        var entry;
        var title;
        var index;
        var obj_entry_relative;
        var obj_prayer;
        var relative_time;
        var tmp_moment;
        var m_start;
        var relative_time = 0;
        var duration;
        var obj_entry_till;
        var sleep_time = 0;
        var remaining_sleep = 0;
        var tmp_m_date;
       
        for(i=0;i<=count-1;i++)
        {
            entry = this.obj_entries.arr_entries[i];
            if(Prayers.is_prayer(entry.title))
            {
                continue;//no need to calculate timings
            }
            
            //is time going to be set relatcve to another obbject?
            if (entry.relative_to !== null)
            {
                //is entry relative to a prayer time
                index = this.obj_entries.find(entry.relative_to);
                obj_entry_relative = this.obj_entries.arr_entries[index] ;
                

                //check if there's a relative time
                if ( entry.relative_time !== null )
                {
                    relative_time = entry.relative_time;
                    m_start = obj_entry_relative.m_start.clone();
                    if(relative_time>0)
                    {
                        
                        m_start.add(relative_time+obj_entry_relative.duration,"minutes");
                        entry.m_start = m_start;
                    }
                    else if(relative_time<0)
                    {
                        
                        m_start.subtract(Math.abs(relative_time),"minutes"); //abs to remove nagative sign
                        entry.m_start = m_start;
                    }
                }
                else
                {
                    m_start = obj_entry_relative.m_start.clone();
                    m_start.add(obj_entry_relative.duration,"minutes");
                    entry.m_start = m_start;
                }
 
                if(entry.till !== null)
                {
                    
                    //find the till object
                    index = this.obj_entries.find(entry.till);
                    obj_entry_till = this.obj_entries.arr_entries[index] ;

                    //Exceptional Case
                    //if we need to calculate to isha then we assume its isha of next day
                    //as timetable always starts from isha of today
                    if(obj_entry_till.title=="Isha")
                    {
                        obj_entry_till.m_start.add(1,"days");
                    }

                    //check if there's a relative time to the till object
                    if(entry.relative_to_till != null)
                    {
                        if(entry.relative_to_till>0)
                        {
                            var duration = moment.duration(obj_entry_till.m_start.diff(entry.m_start));
                            duration = duration.asMinutes();
                            entry.duration = duration + relative_to_till;
                        }
                        else
                        {
                            var duration = moment.duration(obj_entry_till.m_start.diff(entry.m_start));
                            duration = duration.asMinutes();
                            entry.duration = duration  + entry.relative_to_till;// plus as relative_to_till is already -ve
                        }
                    }
                    else
                    {
                        var duration = moment.duration(obj_entry_till.m_start.diff(entry.m_start));
                        duration = duration.asMinutes();
                        entry.duration = duration;
                    }
                }
                
            }

            //if entry is at a fixed time
            if(entry.time!=null)
            {
                tmp_m_date = moment(this.obj_date);
                tmp_m_date.set({h: entry.time.split(':')[0], m: entry.time.split(':')[1]});
                entry.m_start = tmp_m_date;

                if(entry.till !== null)
                {
                    
                    //find the till object
                    index = this.obj_entries.find(entry.till);
                    obj_entry_till = this.obj_entries.arr_entries[index] ;

                    //Exceptional Case
                    //if we need to calculate to isha then we assume its isha of next day
                    //as timetable always starts from isha of today
                    if(obj_entry_till.title=="Isha")
                    {
                        obj_entry_till.m_start.add(1,"days");
                    }
                    //i code repition below
                    //check if there's a relative time to the till object
                    if(entry.relative_to_till != null)
                    {
                        if(entry.relative_to_till>0)
                        {
                            var duration = moment.duration(obj_entry_till.m_start.diff(entry.m_start));
                            duration = duration.asMinutes();
                            entry.duration = duration + relative_to_till;
                        }
                        else
                        {
                            var duration = moment.duration(obj_entry_till.m_start.diff(entry.m_start));
                            duration = duration.asMinutes();
                            entry.duration = duration  + entry.relative_to_till;// plus as relative_to_till is already -ve
                        }
                    }
                    else
                    {
                        var duration = moment.duration(obj_entry_till.m_start.diff(entry.m_start));
                        duration = duration.asMinutes();
                        entry.duration = duration;
                    }
                }
             
            }

            //insert remaining sleep time;
            //calculate total dunya time
            if(entry.title.search("Sleep")!=-1)
            {
                sleep_time = sleep_time + entry.duration;
                if(sleep_time<480) //less than 8 hours
                {
                    remaining_sleep = 480 - sleep_time;
                    //alert(remaining_sleep);
                }
            }
        }
    }
}