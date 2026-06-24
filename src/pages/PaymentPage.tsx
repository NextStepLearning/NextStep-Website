import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader2 } from 'lucide-react';
import { sendRegistrationMail } from '../lib/email';
export default function PaymentPage() {
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const location = useLocation();

const {

itemName,

type,

formData,

price,

participantType

}

= location.state || {};
const [paymentScreenshot, setPaymentScreenshot] =
useState<File | null>(null);
const handleSubmit = async () => {
    setLoading(true);
if (!paymentScreenshot) {
setLoading(false);

alert('Please upload payment screenshot');

return;

}
try {

let table = '';

if (type === 'course') {

table = 'course_registrations';

}

else if (type === 'internship') {

table = 'internship_registrations';

}

else {

table = itemName.includes('Webinar')

? 'webinar_registrations'

: 'bootcamp_registrations';

}
let payload = {};

if (type === 'course') {

payload = {

...formData,

course_name: itemName,

registration_date: new Date().toISOString(),

};

}

else if (type === 'internship') {

const [internshipType, internshipDuration]

= itemName.split(' — ');

payload = {

...formData,

internship_name: itemName,

internship_type: internshipType,

internship_duration: internshipDuration,

registration_date: new Date().toISOString(),

};

}

else if (table === 'webinar_registrations') {

payload = {

...formData,

webinar_name: itemName,

registration_date: new Date().toISOString(),

};

}

else {

payload = {

...formData,

bootcamp_name: itemName,

registration_date: new Date().toISOString(),

};

}

const fileName = `${Date.now()}-${paymentScreenshot?.name}`;

const { error: uploadError }

= await supabase.storage

.from('payment-screenshots')

.upload(

fileName,

paymentScreenshot!

);

if (uploadError)

throw uploadError;

const screenshotUrl = supabase.storage

.from('payment-screenshots')

.getPublicUrl(fileName)

.data.publicUrl;

payload = {

...payload,

payment_screenshot: screenshotUrl,

};
const { error }

= await supabase

.from(table)

.insert(payload);

if (error)

throw error;

await sendRegistrationMail({

full_name: formData?.full_name,

email: formData?.email,

phone: formData?.phone,

college_name: formData?.college_name,

department: formData?.department,

year: formData?.year,

program: itemName,

type: type,

participant_type:

participantType

|| 'Individual',

price: price

});

setLoading(false);

setSuccess(true);
setTimeout(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}, 100);
}

catch(err:any){
    setLoading(false);

console.log(err);

alert('Something went wrong');

}

}
if (success) {

return (

<div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-6">
<div className="w-full max-w-lg rounded-2xl border p-8 shadow-xl text-center my-10">

<div className="flex justify-center mb-4">

<CheckCircle className="text-green-400" size={48} />

</div>

<h3 className="text-3xl font-bold mb-3">

Registration Successful!

</h3>


<p className="text-lg mb-2">

Hi <span className="font-semibold text-brand-purple">

{formData?.full_name}

</span> 👋

</p>
<p className="opacity-70 mb-6">

Registered for

<span className="font-semibold text-brand-purple">

{' '}

{itemName}

{type === 'course' ? ' Course ' : ''}

</span>

<br /><br />

Further details will be shared via email.

</p>

<button

onClick={() => window.location.href='/'}

className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink"

>

Go to Home

</button>

</div>

</div>

);

}
return (

<div className="min-h-screen flex items-center justify-center p-6">

<div className="w-full max-w-lg rounded-2xl border p-8 shadow-xl">

<h1 className="text-3xl font-bold text-center mb-6">

Complete Your Registration

</h1>

<h2 className="text-xl font-semibold text-center mb-4">

{itemName}

</h2>

<div className="text-center mb-6">

<p className="text-sm opacity-70">

Payment Amount

</p>

<p className="text-4xl font-bold">

₹{price}

</p>

</div>

<img

src="/qr-code.png"

alt="QR"


className="w-60 mx-auto rounded-xl mb-6"

/>
<p className="text-sm opacity-70 text-center mt-3">

Scan the QR code, complete the payment and upload the payment screenshot below.

</p>
<p className="text-xs text-red-400 mt-2">

* Payment screenshot is mandatory.

</p>

<label

className="w-full flex flex-col items-center justify-center p-6 mt-4 border-2 border-dashed border-brand-purple/40 rounded-2xl cursor-pointer hover:border-brand-purple transition-all"

>

<div className="text-4xl mb-2">

📷

</div>

<p className="font-semibold">

Upload Payment Screenshot

</p>

<p className="text-xs opacity-60 mt-1">

PNG, JPG or JPEG

</p>

{paymentScreenshot && (

<p className="mt-3 text-sm text-brand-purple font-medium">

✅ {paymentScreenshot.name}

</p>

)}

<input

type="file"

accept="image/*"

className="hidden"

onChange={(e)=>

setPaymentScreenshot(

e.target.files?.[0] || null

)

}

/>

</label>

<button

onClick={handleSubmit}

disabled={loading}

className="w-full mt-6 py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center gap-2 disabled:opacity-60"

>

{loading ? (

<>

<Loader2

size={18}

className="animate-spin"

/>

Processing your registration...
</>

)

:

'Submit Registration'

}

</button>

</div>

</div>

);

}