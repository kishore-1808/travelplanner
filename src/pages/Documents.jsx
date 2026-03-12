import { useState } from 'react'
import { 
  Plus, FileText, CreditCard, Plane as PlaneIcon, 
  Shield, File, Calendar, Trash2, X, Download
} from 'lucide-react'
import { useDocuments } from '../hooks/useStore'

const DOCUMENT_TYPES = [
  { value: 'passport', label: 'Passport', icon: FileText },
  { value: 'visa', label: 'Visa', icon: Shield },
  { value: 'id', label: 'ID Card', icon: CreditCard },
  { value: 'ticket', label: 'Ticket', icon: PlaneIcon },
  { value: 'insurance', label: 'Insurance', icon: Shield },
  { value: 'other', label: 'Other', icon: File },
]

export default function Documents() {
  const { documents, addDocument, deleteDocument } = useDocuments()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    type: 'passport',
    number: '',
    expiryDate: '',
    fileData: null,
    fileName: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name) return
    addDocument(form)
    setForm({ name: '', type: 'passport', number: '', expiryDate: '', fileData: null, fileName: '' })
    setShowForm(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please select a file under 5MB.")
        e.target.value = null
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        setForm(prev => ({ 
          ...prev, 
          fileData: event.target.result,
          fileName: file.name
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getDocIcon = (type) => {
    const dt = DOCUMENT_TYPES.find(d => d.value === type)
    return dt ? dt.icon : File
  }

  const getDocLabel = (type) => {
    const dt = DOCUMENT_TYPES.find(d => d.value === type)
    return dt ? dt.label : 'Other'
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Document Vault</h1>
            <p className="page-subtitle">Securely store and manage your travel documents.</p>
          </div>
          <button
            className={`btn ${showForm ? 'btn-accent' : 'btn-accent'}`}
            onClick={() => setShowForm(!showForm)}
            id="toggle-doc-form"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Cancel' : 'Add Document'}
          </button>
        </div>
      </div>

      {/* Inline Add Document Form */}
      {showForm && (
        <div className="inline-form-card">
          <h3 className="card-title" style={{ marginBottom: 16 }}>Add New Document</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="doc-name">Document Name</label>
                <input
                  id="doc-name"
                  className="form-input"
                  placeholder="e.g., US Passport"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="doc-type">Document Type</label>
                <select
                  id="doc-type"
                  className="form-select"
                  value={form.type}
                  onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
                >
                  {DOCUMENT_TYPES.map(dt => (
                    <option key={dt.value} value={dt.value}>{dt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="doc-number">Document Number</label>
                <input
                  id="doc-number"
                  className="form-input"
                  placeholder="Document number"
                  value={form.number}
                  onChange={e => setForm(prev => ({ ...prev, number: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="doc-expiry">Expiry Date</label>
                <input
                  id="doc-expiry"
                  type="date"
                  className="form-input"
                  value={form.expiryDate}
                  onChange={e => setForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">File Upload (PDF/Image)</label>
              <div
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: 13,
                  position: 'relative',
                  cursor: 'pointer',
                  backgroundColor: form.fileName ? 'var(--primary-bg)' : 'transparent'
                }}
              >
                <input 
                  type="file" 
                  accept=".pdf,.png,.jpg,.jpeg" 
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    opacity: 0, cursor: 'pointer'
                  }}
                />
                <File size={24} style={{ marginBottom: 8, color: form.fileName ? 'var(--primary)' : 'inherit' }} />
                <p style={{ color: form.fileName ? 'var(--primary)' : 'inherit', fontWeight: form.fileName ? 600 : 400 }}>
                  {form.fileName ? form.fileName : 'Click to upload or drag and drop'}
                </p>
                {!form.fileName && <p style={{ fontSize: 11, marginTop: 4 }}>PDF, JPG, PNG (max 5MB)</p>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Document List */}
      {documents.length > 0 ? (
        <div>
          {documents.map(doc => {
            const Icon = getDocIcon(doc.type)
            return (
              <div key={doc.id} className="document-item">
                <div className="document-icon">
                  <Icon size={20} />
                </div>
                <div className="document-info">
                  <h4>{doc.name}</h4>
                  <p>
                    {getDocLabel(doc.type)}
                    {doc.number && ` · ${doc.number}`}
                    {doc.expiryDate && (
                      <>
                        {' · Expires '}
                        {new Date(doc.expiryDate).toLocaleDateString()}
                      </>
                    )}
                  </p>
                </div>
                <div className="document-actions">
                  {doc.fileData && (
                    <a 
                      href={doc.fileData} 
                      download={doc.fileName || 'document'} 
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 10px' }}
                      title="Download Document"
                    >
                      <Download size={14} />
                    </a>
                  )}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => deleteDocument(doc.id)}
                    style={{ padding: '6px 10px' }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">
              <FileText size={28} />
            </div>
            <h3>No Documents</h3>
            <p>Add your travel documents to keep them organized and accessible.</p>
            {!showForm && (
              <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
                <Plus size={16} />
                Add Your First Document
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
