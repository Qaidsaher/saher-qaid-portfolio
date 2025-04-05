import{j as e,r as b,m as j,K as N,L as w,$ as D}from"./app-CvFJx_F7.js";import{I as x}from"./input-error-DdJtVbvX.js";import{b as o,B as u}from"./button-DVSv5keM.js";import{I as f}from"./input-DRu8dsmV.js";import{L as g}from"./label-BOGrb1H7.js";import{H as v,S as C}from"./layout-J-2bvUcG.js";import{R as k,T as P,a as S,b as y,c as z,D as E,P as F,O as L,A as T}from"./app-layout-CrZNnGY6.js";import{X as I}from"./dropdown-menu-BjTqZSk3.js";import{z as _}from"./transition-BFq--v5b.js";import"./index-DMqwLZB6.js";import"./index-NBviKt90.js";import"./app-logo-icon-OJP8soNu.js";import"./briefcase-Ds8aUonx.js";import"./file-text-B_uuA7fw.js";import"./users-D5HMEUSS.js";import"./chevron-right-CJuhAO9Z.js";function A({...a}){return e.jsx(k,{"data-slot":"dialog",...a})}function O({...a}){return e.jsx(P,{"data-slot":"dialog-trigger",...a})}function R({...a}){return e.jsx(F,{"data-slot":"dialog-portal",...a})}function U({...a}){return e.jsx(y,{"data-slot":"dialog-close",...a})}function q({className:a,...s}){return e.jsx(L,{"data-slot":"dialog-overlay",className:o("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",a),...s})}function B({className:a,children:s,...r}){return e.jsxs(R,{"data-slot":"dialog-portal",children:[e.jsx(q,{}),e.jsxs(S,{"data-slot":"dialog-content",className:o("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",a),...r,children:[s,e.jsxs(y,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",children:[e.jsx(I,{}),e.jsx("span",{className:"sr-only",children:"Close"})]})]})]})}function H({className:a,...s}){return e.jsx("div",{"data-slot":"dialog-footer",className:o("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",a),...s})}function $({className:a,...s}){return e.jsx(z,{"data-slot":"dialog-title",className:o("text-lg leading-none font-semibold",a),...s})}function K({className:a,...s}){return e.jsx(E,{"data-slot":"dialog-description",className:o("text-muted-foreground text-sm",a),...s})}function M(){const a=b.useRef(null),{data:s,setData:r,delete:n,processing:i,reset:l,errors:d,clearErrors:m}=j({password:""}),p=t=>{t.preventDefault(),n(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>c(),onError:()=>{var h;return(h=a.current)==null?void 0:h.focus()},onFinish:()=>l()})},c=()=>{m(),l()};return e.jsxs("div",{className:"space-y-6",children:[e.jsx(v,{title:"Delete account",description:"Delete your account and all of its resources"}),e.jsxs("div",{className:"space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10",children:[e.jsxs("div",{className:"relative space-y-0.5 text-red-600 dark:text-red-100",children:[e.jsx("p",{className:"font-medium",children:"Warning"}),e.jsx("p",{className:"text-sm",children:"Please proceed with caution, this cannot be undone."})]}),e.jsxs(A,{children:[e.jsx(O,{asChild:!0,children:e.jsx(u,{variant:"destructive",children:"Delete account"})}),e.jsxs(B,{children:[e.jsx($,{children:"Are you sure you want to delete your account?"}),e.jsx(K,{children:"Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("form",{className:"space-y-6",onSubmit:p,children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(g,{htmlFor:"password",className:"sr-only",children:"Password"}),e.jsx(f,{id:"password",type:"password",name:"password",ref:a,value:s.password,onChange:t=>r("password",t.target.value),placeholder:"Password",autoComplete:"current-password"}),e.jsx(x,{message:d.password})]}),e.jsxs(H,{className:"gap-2",children:[e.jsx(U,{asChild:!0,children:e.jsx(u,{variant:"secondary",onClick:c,children:"Cancel"})}),e.jsx(u,{variant:"destructive",disabled:i,asChild:!0,children:e.jsx("button",{type:"submit",children:"Delete account"})})]})]})]})]})]})]})}const W=[{title:"Profile settings",href:"/settings/profile"}];function de({mustVerifyEmail:a,status:s}){const{auth:r}=N().props,{data:n,setData:i,patch:l,errors:d,processing:m,recentlySuccessful:p}=j({name:r.user.name,email:r.user.email}),c=t=>{t.preventDefault(),l(route("profile.update"),{preserveScroll:!0})};return e.jsxs(T,{breadcrumbs:W,children:[e.jsx(w,{title:"Profile settings"}),e.jsxs(C,{children:[e.jsxs("div",{className:"space-y-6",children:[e.jsx(v,{title:"Profile information",description:"Update your name and email address"}),e.jsxs("form",{onSubmit:c,className:"space-y-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(g,{htmlFor:"name",children:"Name"}),e.jsx(f,{id:"name",className:"mt-1 block w-full",value:n.name,onChange:t=>i("name",t.target.value),required:!0,autoComplete:"name",placeholder:"Full name"}),e.jsx(x,{className:"mt-2",message:d.name})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(g,{htmlFor:"email",children:"Email address"}),e.jsx(f,{id:"email",type:"email",className:"mt-1 block w-full",value:n.email,onChange:t=>i("email",t.target.value),required:!0,autoComplete:"username",placeholder:"Email address"}),e.jsx(x,{className:"mt-2",message:d.email})]}),a&&r.user.email_verified_at===null&&e.jsxs("div",{children:[e.jsxs("p",{className:"text-muted-foreground -mt-4 text-sm",children:["Your email address is unverified."," ",e.jsx(D,{href:route("verification.send"),method:"post",as:"button",className:"text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",children:"Click here to resend the verification email."})]}),s==="verification-link-sent"&&e.jsx("div",{className:"mt-2 text-sm font-medium text-green-600",children:"A new verification link has been sent to your email address."})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(u,{disabled:m,children:"Save"}),e.jsx(_,{show:p,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-neutral-600",children:"Saved"})})]})]})]}),e.jsx(M,{})]})]})}export{de as default};
