import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function CourseManager() {

const inputStyle =
'w-full border rounded-xl px-4 py-3 mb-4 bg-white text-dark-bg border-light-border placeholder:text-dark-bg/50 outline-none';

const [showForm,setShowForm]=useState(false);

const [title,setTitle]=useState('');

const [description,setDescription]=useState('');

const [date,setDate]=useState('');

const [duration,setDuration]=useState('');

const [price,setPrice]=useState('');

const [mode,setMode]=useState('Online');

const [status,setStatus]=useState('Open');

const [image,setImage]=useState('');

const [highlights,setHighlights]=useState('');

const [courses,setCourses]=useState<any[]>([]);

useEffect(()=>{

fetchCourses();

},[]);

const fetchCourses = async()=>{

const {data,error}=await supabase

.from('courses')

.select('*')

.order('created_at',{

ascending:false

});

if(error){

console.log(error);

return;

}

setCourses(data || []);

}

const handleSave = async()=>{
if(

status !== 'Coming Soon' &&

!date

){

alert('Please select a date');

return;

}
const {error}=await supabase

.from('courses')

.insert({

title,

description,

date,

duration,

price:Number(price),

mode,

status,

image,

highlights

});

if(error){

console.log(error);

alert(error.message);

return;

}

alert('Course saved successfully');

setTitle('');

setDescription('');

setDate('');

setDuration('');

setPrice('');

setImage('');

setHighlights('');

fetchCourses();

setShowForm(false);

}

const handleDelete = async(id:number)=>{

const confirmDelete=

window.confirm(

'Delete this course?'

);

if(!confirmDelete)

return;

const {error}=await supabase

.from('courses')

.delete()

.eq('id',id);

if(error){

alert(error.message);

return;

}

fetchCourses();

}

return(

<div>

<div className="flex items-center justify-between mb-8">

<h1 className="text-4xl font-bold">

Manage Courses

</h1>

<button

onClick={()=>setShowForm(true)}

className="px-5 py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink"

>

+ Add Course

</button>

</div>

{showForm && (

<div className="max-w-3xl border rounded-3xl p-8">

<h2 className="text-2xl font-bold mb-6">

Add Course

</h2>

<input

placeholder="Course Title"

value={title}

onChange={(e)=>

setTitle(e.target.value)

}

className={inputStyle}

/>

<textarea

placeholder="Description"

value={description}

onChange={(e)=>

setDescription(e.target.value)

}

className={inputStyle}

/>

<div className="grid md:grid-cols-2 gap-4">

<input

type="date"

value={date}

disabled={status === 'Coming Soon'}

required={status !== 'Coming Soon'}

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

className={inputStyle}

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

<option value="Coming Soon">
Coming Soon
</option>

</select>

<input

placeholder="Image URL"

value={image}

onChange={(e)=>

setImage(e.target.value)

}

className={inputStyle}

/>

</div>

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

Save Course

</button>

</div>

)}

<div className="mt-10 space-y-4">

{courses.map(course=>(

<div

key={course.id}

className="border rounded-2xl p-5 flex items-center justify-between"

>

<div>

<h3 className="text-xl font-bold">

{course.title}

</h3>

<p className="opacity-60 text-sm">

₹{

Number(course.price)===0

?'FREE'

: course.price

}

</p>

</div>

<div className="flex gap-3">

<button

className="px-4 py-2 rounded-xl border"

>

Edit

</button>

<button

onClick={()=>

handleDelete(course.id)

}

className="px-4 py-2 rounded-xl bg-red-500 text-white"

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