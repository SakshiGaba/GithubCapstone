import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
    const loadItems = () => {
    fetch('/api/items')
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
        setError('');
      })
      .catch(() => {
        setLoading(false);
        setError('Something went wrong loading items. Please try again.');
      });
  };
      

  useEffect(() => {
    loadItems();
  }, []);

    const addItem = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setName('');
        loadItems();
      } else {
        setError('Could not add item. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

    const deleteItem = async (id) => {
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadItems();
      } else {
        setError('Could not delete item. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
        <div className="container">
      <h1>Items</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={addItem} className="add-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New item name"
        />
        <button type="submit">Add</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items yet. Add one above.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
