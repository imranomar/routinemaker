class Entries
{
    constructor()
    {
        this.arr_entries = new Array();
    }

    //function to add an entry to entries' array
    add(entry)
    {
        
        var i = 0;
        var found = false;
        for(i=0;i<=this.arr_entries.length-1;i++)
        {
            if(this.arr_entries[i].title == entry.title)
            {
                found = true;
                break;
            }
            else
            {
                found = false;
            }
        }

        if(found==true)
        {
            alert(entry.title + " already exists");
        }
        else
        {
            this.arr_entries.push(entry);
        }
    }

    //function to find entry in entries by title
    find(title)
    {
        var i = 0;
        var found = false;
        var index = 0;
        for(i=0;i<=this.arr_entries.length-1;i++) {
            if(this.arr_entries[i].title.toUpperCase() == title.toUpperCase())
            {
                index = i
                break;
            }
            else
            {
                index = -1;
            }
        }
        return index;
    }

    sort()
    {
       
        this.arr_entries.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            var duration = moment.duration(a.m_start.diff(b.m_start));
            duration = duration.asMinutes();
            return duration;
        });
    }

    print_entries()
    {
        var i = 0;
        for(i=0;i<=this.arr_entries.length-1;i++)
        {
            echo(this.arr_entries[i]);
        }
    }
}