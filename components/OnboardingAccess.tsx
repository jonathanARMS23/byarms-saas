'use client'
import { useState } from 'react'
export function OnboardingAccess(){
  const [error,setError]=useState(''),[busy,setBusy]=useState(false)
  async function enter(){setBusy(true);setError('');try{const token=new URLSearchParams(window.location.hash.slice(1)).get('invitation');const response=await fetch('/api/onboarding/access',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});const data=await response.json();if(!response.ok)throw new Error(data.error);window.history.replaceState(null,'','/onboarding');window.location.reload()}catch(e){setError(e instanceof Error?e.message:'Connexion indisponible')}finally{setBusy(false)}}
  return <div className="m-form"><h2>Bienvenue dans votre espace.</h2><p className="m-lead">Ouvrez le lien privé reçu de votre interlocuteur ByARMS, puis activez votre accès. L’invitation est à usage unique.</p><button className="m-button" style={{marginTop:25}} onClick={enter} disabled={busy}>{busy?'Connexion…':'Activer mon accès →'}</button>{error&&<p className="m-error" role="alert">{error}</p>}<p className="m-note">Votre session dure sept jours. Pour reprendre depuis un autre navigateur, demandez une nouvelle invitation.</p></div>
}
