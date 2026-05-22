import { CheckCircle2, Clock, XCircle } from "lucide-react"

type Status = "pending" | "approved" | "rejected"

export default function StatusTimeline({ status }: { status: Status }) {

const steps = [
{ label: "Demande envoyée", icon: Clock, done: true },
{ label: "Validation", icon: CheckCircle2, done: status === "approved" },
{ label: "Refus", icon: XCircle, done: status === "rejected" }
]

return (

<div className="flex items-center justify-between mt-6">

{steps.map((step,index)=>{

const Icon = step.icon

return(

<div key={step.label} className="flex-1 flex flex-col items-center relative">

{index !== 0 && (
<div className="absolute left-0 top-5 w-full h-[2px] bg-gray-200 -z-10"/>
)}

<div
className={`w-12 h-12 flex items-center justify-center rounded-full border

${step.done
? "bg-green-500 text-white border-green-500"
: "bg-white text-gray-400 border-gray-300"
}
`}
>

<Icon size={20}/>

</div>

<span
className={`text-sm mt-2
${step.done ? "text-green-600" : "text-gray-400"}
`}
>

{step.label}

</span>

</div>

)

})}

</div>

)

}