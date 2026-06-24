import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
export default function EventManager() {
const inputStyle =
'w-full border rounded-xl px-4 py-3 mb-4 bg-white text-dark-bg border-light-border placeholder:text-dark-bg/50 outline-none';

const [showForm,setShowForm]=useState(false);
const [title,setTitle]=useState('');

const [description,setDescription]=useState('');

const [date,setDate]=useState('');

const [duration,setDuration]=useState('');

const [price,setPrice]=useState('');

const [category,setCategory]=useState('Webinar');

const [mode,setMode]=useState('Online');
const [status,setStatus]=useState('Open');

const [image,setImage]=useState('');

const [highlights,setHighlights]=useState('');
const [events,setEvents]=useState<any[]>([]);

const handleSave = async () => {

const { error } = await supabase

.from('events')

.insert({

title,

description,

category,

mode,

date,

duration,

price: Number(price),

status,

image,

highlights

});

if(error){

console.log(error);

alert(JSON.stringify(error));

return;

}
alert('Event saved successfully');

setTitle('');

setDescription('');

setDate('');

setDuration('');

setPrice('');

setImage('');

setHighlights('');

fetchEvents();

setShowForm(false);
};

const fetchEvents = async () => {

const { data,error } = await supabase

.from('events')

.select('*')

.order('created_at',{

ascending:false

});
if(error){

console.log(error);

return;

}

setEvents(data || []);

};
useEffect(()=>{

fetchEvents();

},[]);
const handleDelete = async (id:number) => {

const confirmDelete = window.confirm(

'Delete this event?'

);

if(!confirmDelete)

return;

const { error } = await supabase

.from('events')

.delete()

.eq('id',id);

if(error){

console.log(error);

alert(error.message);

return;

}

fetchEvents();

};
return(

<div>

<div className="flex items-center justify-between mb-8">

<h1 className="text-4xl font-bold">

Manage Events

</h1>

<button

onClick={()=>setShowForm(true)}

className="px-5 py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink"

>

+ Add Event

</button>

</div>

{showForm && (

<div className="max-w-3xl border rounded-3xl p-8">

<h2 className="text-2xl font-bold mb-6">

Add Event

</h2>
<input

placeholder="Event Title"

value={title}

onChange={(e)=>

setTitle(e.target.value)

}

className="w-full border rounded-xl px-4 py-3 mb-4 bg-white text-dark-bg border-light-border placeholder:text-dark-bg/50 outline-none"
/>

<textarea

placeholder="Description"

value={description}

onChange={(e)=>

setDescription(e.target.value)

}

className="w-full border rounded-xl px-4 py-3 mb-4 bg-white text-dark-bg border-light-border placeholder:text-dark-bg/50 outline-none"
/>

<div className="grid md:grid-cols-2 gap-4">

<input

type="date"

value={date}

onChange={(e)=>

setDate(e.target.value)

}

className={inputStyle}

/>

<input

placeholder="Duration"

value={duration}

onChange={(e)=>

setDuration(e.target.value)

}

className={inputStyle}

/>

</div>
<input

placeholder="Price"

value={price}

onChange={(e)=>

setPrice(e.target.value)

}

className="w-full border rounded-xl px-4 py-3 mb-4 bg-white text-dark-bg border-light-border placeholder:text-dark-bg/50 outline-none"
/>
<div className="grid md:grid-cols-2 gap-4">

<select

value={status}

onChange={(e)=>

setStatus(e.target.value)

}

className={inputStyle}

>

<option value="Open">

Open

</option>

<option value="Registration Closed">

Registration Closed

</option>

</select>


</div>
<div className="grid md:grid-cols-2 gap-4">

<select

value={category}

onChange={(e)=>

setCategory(e.target.value)

}

className={inputStyle}

>

<option value="Webinar">

Webinar

</option>

<option value="Bootcamp & Workshop">

Bootcamp & Workshop

</option>

<option value="Upcoming Event">

Upcoming Event

</option>

</select>

<select

value={mode}

onChange={(e)=>

setMode(e.target.value)

}

className={inputStyle}

>

<option value="Online">

Online

</option>

<option value="Offline">

Offline

</option>

</select>

</div>
<textarea

placeholder="Highlights (Separate using commas)"

value={highlights}

onChange={(e)=>

setHighlights(e.target.value)

}

className={inputStyle}

/>
<button

onClick={handleSave}

className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink"

>

Save Event

</button>
</div>


)}
<div className="mt-10 space-y-4">

{events.map((event:any) => (
<div

key={event.id}

className="border rounded-2xl p-5 flex items-center justify-between"

>

<div>

<h3 className="text-xl font-bold">

{event.title}

</h3>

<p className="opacity-60 text-sm">

{event.category}

</p>

</div>

<div className="flex gap-3">

<button

className="px-4 py-2 rounded-xl border"

>

Edit

</button>

<button

onClick={() => handleDelete(event.id)}

className="px-4 py-2 rounded-xl bg-red-500 text-white hover:opacity-90"

>

Delete

</button>

</div>

</div>

))}

</div>
</div>

)

}