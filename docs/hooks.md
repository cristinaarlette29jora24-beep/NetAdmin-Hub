# Hooks de React

## Hooks nativos utilizados

### useState

Se usa para gestionar el estado local de los componentes: los valores de los formularios, los resultados de las calculadoras y los estados de la UI.

**Ejemplo en la calculadora de subredes:**

```tsx
const [ipInput, setIpInput] = useState<string>('');
const [maskInput, setMaskInput] = useState<string>('');
const [result, setResult] = useState<SubnetResult | null>(null);
const [error, setError] = useState<string | null>(null);
```

---

### useEffect

Se usa para manejar efectos secundarios: cargar datos al montar un componente, sincronizar con LocalStorage o hacer scroll al final del chat.

**Ejemplo: cargar historial de LocalStorage al montar:**

```tsx
useEffect(() => {
  const saved = localStorage.getItem('subnet-history');
  if (saved) {
    setHistory(JSON.parse(saved));
  }
}, []); // [] = solo se ejecuta una vez al montar
```

**Ejemplo: scroll automático en el chat:**

```tsx
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]); // se ejecuta cada vez que llega un mensaje nuevo
```

---

### useMemo

Se usa para evitar recalcular valores costosos en cada render. En este proyecto se aplica al filtrado de la tabla de puertos, que puede tener cientos de filas.

**Ejemplo:**

```tsx
const filteredPorts = useMemo(() => {
  return ports.filter(port =>
    port.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    port.number.toString().includes(searchQuery)
  );
}, [ports, searchQuery]); // solo recalcula si ports o searchQuery cambian
```

---

### useCallback

Se usa para memorizar funciones y evitar que se recreen en cada render, especialmente cuando se pasan como props a componentes hijos.

**Ejemplo:**

```tsx
const handleSendMessage = useCallback(async (content: string) => {
  if (!content.trim()) return;
  setLoading(true);
  try {
    const response = await assistantApi.sendMessage(content);
    setMessages(prev => [...prev, response]);
  } finally {
    setLoading(false);
  }
}, []); // no depende de ningún estado, se crea una sola vez
```

---

## Custom Hooks

### useSubnetCalculator

**Archivo:** `src/hooks/useSubnetCalculator.ts`

Encapsula toda la lógica de la calculadora de subredes: validación de entradas, cálculo de resultados y manejo de errores.

```tsx
interface UseSubnetCalculatorReturn {
  result: SubnetResult | null;
  error: string | null;
  loading: boolean;
  calculate: (ip: string, mask: string) => Promise<void>;
  reset: () => void;
}

function useSubnetCalculator(): UseSubnetCalculatorReturn {
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = useCallback(async (ip: string, mask: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await subnetApi.calculate(ip, mask);
      setResult(data);
    } catch (err) {
      setError('Error al calcular la subred. Verifica los valores introducidos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, error, loading, calculate, reset };
}
```

**¿Por qué un custom hook?** Porque esta lógica se podría reutilizar en varios sitios (calculadora principal, widget del dashboard) y mantiene los componentes limpios al separar la lógica de la UI.

---

### useLocalStorage

**Archivo:** `src/hooks/useLocalStorage.ts`

Hook genérico para leer y escribir en LocalStorage con soporte de tipos TypeScript.

```tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  }, [key]);

  return [storedValue, setValue];
}
```
