# Formularios e Interacción

## Formularios controlados en React

En este proyecto se usan **formularios controlados**: el valor de cada input está enlazado a una variable de estado de React mediante `value` y `onChange`. Esto permite validar en tiempo real y controlar exactamente qué datos se envían.

---

## Formulario de la Calculadora de Subredes

**Archivo:** `src/pages/SubnetCalculatorPage.tsx`

El usuario introduce una dirección IP y una máscara de subred. El formulario valida el formato antes de enviar.

```tsx
function SubnetForm() {
  const [ip, setIp] = useState('');
  const [mask, setMask] = useState('');
  const [errors, setErrors] = useState<{ ip?: string; mask?: string }>({});
  const { calculate, loading } = useSubnetCalculator();

  const validateIp = (value: string): string | undefined => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!value) return 'La dirección IP es obligatoria';
    if (!ipRegex.test(value)) return 'Formato de IP inválido (ej: 192.168.1.0)';
    const parts = value.split('.').map(Number);
    if (parts.some(p => p > 255)) return 'Los octetos deben ser entre 0 y 255';
  };

  const validateMask = (value: string): string | undefined => {
    if (!value) return 'La máscara es obligatoria';
    const cidr = parseInt(value.replace('/', ''));
    if (isNaN(cidr) || cidr < 0 || cidr > 32) return 'Máscara inválida (ej: /24 o 255.255.255.0)';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ipError = validateIp(ip);
    const maskError = validateMask(mask);

    if (ipError || maskError) {
      setErrors({ ip: ipError, mask: maskError });
      return;
    }

    setErrors({});
    calculate(ip, mask);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ip">Dirección IP</label>
        <input
          id="ip"
          type="text"
          value={ip}
          onChange={e => setIp(e.target.value)}
          placeholder="192.168.1.0"
          className={errors.ip ? 'border-red-500' : 'border-gray-300'}
        />
        {errors.ip && <p className="text-red-500 text-sm">{errors.ip}</p>}
      </div>

      <div>
        <label htmlFor="mask">Máscara / CIDR</label>
        <input
          id="mask"
          type="text"
          value={mask}
          onChange={e => setMask(e.target.value)}
          placeholder="/24 o 255.255.255.0"
          className={errors.mask ? 'border-red-500' : 'border-gray-300'}
        />
        {errors.mask && <p className="text-red-500 text-sm">{errors.mask}</p>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>
    </form>
  );
}
```

---

## Formulario del Chat (Asistente IA)

**Archivo:** `src/pages/AssistantPage.tsx`

Input de texto para enviar mensajes al asistente. Se envía al pulsar Enter o hacer clic en el botón.

```tsx
function ChatInput() {
  const [message, setMessage] = useState('');
  const { sendMessage, loading } = useAssistant();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    sendMessage(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu pregunta sobre redes..."
        disabled={loading}
        rows={2}
      />
      <button type="submit" disabled={loading || !message.trim()}>
        Enviar
      </button>
    </form>
  );
}
```

---

## Buscador de la tabla de puertos

**Archivo:** `src/pages/PortsPage.tsx`

Input de búsqueda que filtra la tabla en tiempo real usando `useMemo`.

```tsx
const [query, setQuery] = useState('');

const filtered = useMemo(() =>
  ports.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.port.toString().includes(query)
  ),
  [ports, query]
);

return (
  <input
    type="search"
    value={query}
    onChange={e => setQuery(e.target.value)}
    placeholder="Buscar por nombre o número de puerto..."
  />
);
```

---

## Validación: principios aplicados

- Validación en el cliente antes de llamar a la API para evitar peticiones innecesarias.
- Los mensajes de error se muestran debajo del campo afectado, no como alertas.
- El botón de submit se deshabilita mientras hay una petición en curso (`loading`).
- Los inputs muestran estilos de error (borde rojo) cuando la validación falla.
