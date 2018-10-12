class Entry
{
    // verb: can be 'before', 'after' or 'till'
    // time: if it is going to happen at a specific timetable
    // days: can be 'sun','mon','tue'....'sat' or 'all'
    // till is the object who's time you want to continue the entry
    constructor(title,days,time,duration,relative_time,relative_to,till,relative_to_till)
    {
        this.m_start = '' //moment object for start time
        this.title = title;
        this.days = days;
        this.time = time;
        this.duration = duration;
        this.relative_time = relative_time;
        this.relative_to = relative_to;
        this.till = till;
        this.relative_to_till = relative_to_till;
        this.type = ''; //i not put in constructor yet
    }
}