class Prayers
{
    constructor(obj_date)
    {
        this.arr_prayers = new Array();
        //var obj_prayer;
        var str_date_only = this.format_date(obj_date);
        var format = "MM-DD-YYYY HH:mm";
        var obj_prayer;
        prayTimes.adjust( {fajr: 19,isha: 21});
        var fajr = str_date_only + " " + prayTimes.getTimes(obj_date, [lat, lng], 4).fajr;
        var zuhur = str_date_only + " " + prayTimes.getTimes(obj_date, [lat, lng], 4).dhuhr;
        var asr = str_date_only + " " + prayTimes.getTimes(obj_date, [lat, lng], 4).asr;
        var magrib = str_date_only + " " + prayTimes.getTimes(obj_date, [lat, lng], 4).maghrib;
        var isha = str_date_only + " " + prayTimes.getTimes(obj_date, [lat, lng], 4).isha;
        var sunrise = str_date_only + " " + prayTimes.getTimes(obj_date, [lat, lng], 4).sunrise; //NOTE: sunrize not added in prayers array
        
        //Convert prayer timings to moment objects      
        var m_fajr = moment(fajr, format);
        var m_zuhur = moment(zuhur, format);
        var m_asr = moment(asr, format);
        var m_magrib = moment(magrib, format);
        var m_isha = moment(isha, format);
        var m_sunrise = moment(sunrise, format);

        //Timetable starts from today evening so add 1 day to
        //rest of the prayers
        m_fajr.add(1,'day');
        m_zuhur.add(1,'day');
        m_asr.add(1,'day');
        m_magrib.add(1,'day');
        //this.m_isha.add(1,'day'); // as its today 
        echo(m_sunrise.format('MM-DD-YYYY hh:mm'));
        m_sunrise.add(1,'day');
        echo(m_sunrise.format('MM-DD-YYYY hh:mm'));

        //add all prayers and sunrise as objects to an array
        obj_prayer = {title:"Fajr",m_start:m_fajr,time:fajr,duration:38};
        this.arr_prayers.push(obj_prayer);
        
        obj_prayer = {title:"Sunrise",m_start:m_sunrise,time:sunrise,duration:25};
        this.arr_prayers.push(obj_prayer);

        obj_prayer = {title:"Zuhur",m_start:m_zuhur,time:zuhur,duration:35};
        this.arr_prayers.push(obj_prayer);

        obj_prayer = {title:"Asr",m_start:m_asr,time:asr,duration:30};
        this.arr_prayers.push(obj_prayer);

        obj_prayer = {title:"Magrib",m_start:m_magrib,time:magrib,duration:35};
        this.arr_prayers.push(obj_prayer);
        
        obj_prayer = {title:"Isha",m_start:m_isha,time:isha,duration:35};
        this.arr_prayers.push(obj_prayer);


        echo(fajr);;echo(sunrise);echo(zuhur);echo(asr);echo(magrib);echo(isha);
        echo(m_sunrise.format('MM-DD-YYYY hh:mm'));
    }

    //returns a prayer in an object format: title,momeent,time,duration
    get_prayer(str_prayer)
    {
        var count = this.arr_prayers.length;
        var i = 0;
        for(i=0;i<=count-1;i++)
        {
            if(this.arr_prayers[i].title.toUpperCase() === str_prayer.toUpperCase() )
            {
                return this.arr_prayers[i];
            }
        }
    }

    static is_prayer(str_prayer)
    {
        if(str_prayer.toUpperCase() === "FAJR")
        {
            return true;
        }
        if(str_prayer.toUpperCase() === "ASR")
        {
            return true;
        }
        if(str_prayer.toUpperCase() === "ZUHUR")
        {
            return true;
        }
        if(str_prayer.toUpperCase() === "MAGRIB")
        {
            return true;
        }
        if(str_prayer.toUpperCase() === "ISHA")
        {
            return true;
        }
    }

    format_date(obj_date){
        // 01, 02, 03, ... 29, 30, 31
        var dd = (obj_date.getDate() < 10 ? '0' : '') + obj_date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((obj_date.getMonth() + 1) < 10 ? '0' : '') + (obj_date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = obj_date.getFullYear();
     
        // create the format you want
        return (MM + "-" + dd + "-" + yyyy);
     }
}