import { useState } from 'react';
import Icon from '@/components/ui/icon';

const LEADS_URL = 'https://functions.poehali.dev/b013488e-c99e-40a6-b980-4bfa0d5232c0';

type Status = 'idle' | 'loading' | 'success' | 'error';

const LeadForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) e.name = 'Укажите имя';
    if (phone.replace(/\D/g, '').length < 10) e.phone = 'Укажите корректный телефон';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch(LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      });
      if (!res.ok) throw new Error('fail');
      setStatus('success');
      setName('');
      setPhone('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 border border-gold/25 animate-scale-in">
        <div className="w-16 h-16 flex items-center justify-center rounded-full border border-gold/40 mb-6">
          <Icon name="Check" size={30} className="text-gold" />
        </div>
        <p className="font-serif text-3xl text-stone-100 mb-3">Заявка принята</p>
        <p className="text-stone-400 font-light max-w-xs">
          Наш консьерж свяжется с вами в ближайшее время. Благодарим за доверие.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-gold text-xs uppercase tracking-[0.2em] hover:text-gold-light transition-colors"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  const inputCls =
    'w-full bg-transparent border-b py-4 text-stone-200 placeholder:text-stone-500 outline-none transition-colors';

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <p className="font-serif text-2xl text-stone-100 mb-4">Записаться на консультацию</p>

      <div>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputCls} ${errors.name ? 'border-red-500/60' : 'border-gold/30 focus:border-gold'}`}
        />
        {errors.name && <p className="text-red-400/80 text-xs mt-2">{errors.name}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${inputCls} ${errors.phone ? 'border-red-500/60' : 'border-gold/30 focus:border-gold'}`}
        />
        {errors.phone && <p className="text-red-400/80 text-xs mt-2">{errors.phone}</p>}
      </div>

      <textarea
        rows={3}
        placeholder="Сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${inputCls} border-gold/30 focus:border-gold resize-none`}
      />

      {status === 'error' && (
        <p className="text-red-400/80 text-sm flex items-center gap-2">
          <Icon name="TriangleAlert" size={16} /> Не удалось отправить. Попробуйте ещё раз.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full mt-4 px-9 py-4 bg-gold text-noir text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Icon name="Loader2" size={16} className="animate-spin" /> Отправка…
          </>
        ) : (
          'Отправить заявку'
        )}
      </button>
    </form>
  );
};

export default LeadForm;
