import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Field, FieldError } from '../components'

export default function Register() {
  const { register } = useApp(); const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' }); const [error, setError] = useState('')
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = event => { event.preventDefault(); setError(''); const result = register(form.name, form.email, form.password); if (result.error) return setError(result.error); navigate('/dashboard') }
  return <div className="auth-page"><div className="auth-brand"><Link to="/" className="brand"><span className="brand-mark">P</span><span>Park<span>Smart</span></span></Link></div><div className="auth-panel"><div className="auth-copy"><span className="eyebrow">YOUR EVERYDAY CO-PILOT</span><h1>More time<br /><em>in your day.</em></h1><p>Join a calmer way to handle the little logistics that keep life moving.</p></div><form className="auth-form" onSubmit={submit}><span className="eyebrow">CREATE ACCOUNT</span><h2>Get started.</h2><p className="muted">Create a local demo account to start using ParkSmart.</p><Field label="Full name"><input name="name" value={form.name} onChange={change} placeholder="Aarav Mehta" /></Field><Field label="Email address"><input name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" /></Field><Field label="Password"><input name="password" type="password" value={form.password} onChange={change} placeholder="At least 4 characters" /></Field>{error && <FieldError>{error}</FieldError>}<button className="button coral full">Create account <span>↗</span></button><p className="form-foot">Already have an account? <Link to="/login">Sign in</Link></p></form></div></div>
}
