# Context API y Estado Global

## ¿Cuándo es útil usar Context API?

Context API es la solución nativa de React para compartir estado entre componentes que no tienen una relación directa padre-hijo. Sin Context, habría que pasar props a través de múltiples niveles (lo que se llama "prop drilling"), haciendo el código difícil de mantener.

Se usa Context cuando:
- Un valor necesita ser accesible desde muchos componentes de distintos niveles del árbol.
- El estado cambia con poca frecuencia (para actualizaciones muy frecuentes puede ser mejor una librería externa).
- Queremos evitar pasar las mismas props por 3 o más niveles de componentes.

En este proyecto **no** se usa Context para todo el estado, solo para lo que realmente lo necesita: el tema (modo oscuro/claro) y el historial del chat del asistente.

---

## ThemeContext

**Archivo:** `src/context/ThemeContext.tsx`

Comparte el tema actual (oscuro o claro) y la función para alternarlo por toda la aplicación.

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
}
```

**¿Por qué Context aquí?** El tema afecta a todos los componentes de la app (Navbar, fondos, textos). Sería imposible pasarlo como prop a cada componente.

---

## AssistantContext

**Archivo:** `src/context/AssistantContext.tsx`

Comparte el historial de conversación del asistente IA entre la página del asistente y posibles widgets en otras páginas.

```tsx
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AssistantContextType {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await assistantApi.sendMessage(content, messages);
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      // manejo de error
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const clearHistory = useCallback(() => setMessages([]), []);

  return (
    <AssistantContext.Provider value={{ messages, loading, sendMessage, clearHistory }}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant(): AssistantContextType {
  const context = useContext(AssistantContext);
  if (!context) throw new Error('useAssistant debe usarse dentro de AssistantProvider');
  return context;
}
```

---

## Configuración en App.tsx

Los providers se anidan en `App.tsx` para que todos los componentes hijos tengan acceso al contexto:

```tsx
function App() {
  return (
    <ThemeProvider>
      <AssistantProvider>
        <Router>
          <Routes>
            {/* rutas */}
          </Routes>
        </Router>
      </AssistantProvider>
    </ThemeProvider>
  );
}
```
