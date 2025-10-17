import React from 'react';
import { useForm } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { CardData, FormField, ContactItem } from '../../types';
import { cn, setNestedProperty, getNestedProperty } from '../../utils';

interface FormBuilderProps {
  data: CardData;
  onChange: (data: Partial<CardData>) => void;
  activeSection: string;
  className?: string;
}

interface ArrayFieldProps {
  label: string;
  value: ContactItem[];
  onChange: (value: ContactItem[]) => void;
  placeholder?: string;
}

const ArrayField: React.FC<ArrayFieldProps> = ({ label, value = [], onChange, placeholder }) => {
  const addItem = () => {
    onChange([...value, { value: '', label: '' }]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ContactItem, newValue: string) => {
    const updated = value.map((item, i) => 
      i === index ? { ...item, [field]: newValue } : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="form-label">{label}</label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center px-2 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>
      
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={placeholder || "Value"}
              value={item.value}
              onChange={(e) => updateItem(index, 'value', e.target.value)}
              className="form-input flex-1"
            />
            <input
              type="text"
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateItem(index, 'label', e.target.value)}
              className="form-input w-24"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-2 py-1 text-red-600 hover:text-red-800 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {value.length === 0 && (
          <div className="text-sm text-gray-500 italic py-2">
            No {label.toLowerCase()} added yet. Click "Add" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

const FormField: React.FC<{
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}> = ({ field, value, onChange }) => {
  const baseInputProps = {
    id: field.key,
    placeholder: field.placeholder,
    required: field.required,
    className: "form-input"
  };

  switch (field.type) {
    case 'textarea':
      return (
        <div>
          <label htmlFor={field.key} className="form-label">
            {field.label}
          </label>
          <textarea
            {...baseInputProps}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="form-input resize-none"
          />
        </div>
      );

    case 'color':
      return (
        <div>
          <label htmlFor={field.key} className="form-label">
            {field.label}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              {...baseInputProps}
              value={value || field.defaultValue || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || field.defaultValue || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="form-input flex-1 font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
      );

    case 'select':
      return (
        <div>
          <label htmlFor={field.key} className="form-label">
            {field.label}
          </label>
          <select
            {...baseInputProps}
            value={value || field.defaultValue || ''}
            onChange={(e) => onChange(e.target.value)}
            className="form-input"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={field.key}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor={field.key} className="ml-2 text-sm text-gray-700">
            {field.label}
          </label>
        </div>
      );

    case 'number':
      return (
        <div>
          <label htmlFor={field.key} className="form-label">
            {field.label}
          </label>
          <input
            type="number"
            {...baseInputProps}
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </div>
      );

    case 'array':
      return (
        <ArrayField
          label={field.label}
          value={value || []}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      );

    default:
      return (
        <div>
          <label htmlFor={field.key} className="form-label">
            {field.label}
          </label>
          <input
            type={field.type}
            {...baseInputProps}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
  }
};

const FormBuilder: React.FC<FormBuilderProps> = ({
  data,
  onChange,
  activeSection,
  className
}) => {
  // Mock form schema - in real app, this would come from template
  const formFields: FormField[] = [
    // Personal section
    { key: 'first_name', label: 'First Name', type: 'text', section: 'personal', required: true },
    { key: 'last_name', label: 'Last Name', type: 'text', section: 'personal' },
    { key: 'prefix', label: 'Prefix', type: 'text', section: 'personal', placeholder: 'Dr., Mr., Ms.' },
    { key: 'suffix', label: 'Suffix', type: 'text', section: 'personal', placeholder: 'Jr., Sr., PhD' },
    { key: 'pronouns_v2', label: 'Pronouns', type: 'text', section: 'personal', placeholder: 'he/him, she/her, they/them' },
    { key: 'designation', label: 'Job Title', type: 'text', section: 'personal', placeholder: 'Software Engineer' },
    { key: 'company', label: 'Company', type: 'text', section: 'personal', placeholder: 'Tech Corp' },
    { key: 'department', label: 'Department', type: 'text', section: 'personal', placeholder: 'Engineering' },
    { key: 'summary', label: 'Bio/Summary', type: 'textarea', section: 'personal', placeholder: 'Tell us about yourself...' },
    
    // Contact section
    { key: 'phone_v2', label: 'Phone Numbers', type: 'array', section: 'contact', placeholder: '+1 (555) 123-4567' },
    { key: 'email_v2', label: 'Email Addresses', type: 'array', section: 'contact', placeholder: 'john@example.com' },
    { key: 'website_v2', label: 'Websites', type: 'array', section: 'contact', placeholder: 'https://example.com' },
    { key: 'address_v2', label: 'Address', type: 'textarea', section: 'contact', placeholder: '123 Main St\nCity, State 12345' },
    
    // Social section
    { key: 'social_links.linkedin', label: 'LinkedIn', type: 'url', section: 'social', placeholder: 'https://linkedin.com/in/username' },
    { key: 'social_links.twitter', label: 'Twitter', type: 'url', section: 'social', placeholder: 'https://twitter.com/username' },
    { key: 'social_links.github', label: 'GitHub', type: 'url', section: 'social', placeholder: 'https://github.com/username' },
    { key: 'social_links.instagram', label: 'Instagram', type: 'url', section: 'social', placeholder: 'https://instagram.com/username' },
    
    // Customization section
    { key: 'customizations.background_color', label: 'Background Color', type: 'color', section: 'customization', defaultValue: '#ffffff' },
    { key: 'customizations.icon_color', label: 'Text/Icon Color', type: 'color', section: 'customization', defaultValue: '#333333' },
    { key: 'customizations.button_color', label: 'Button Color', type: 'color', section: 'customization', defaultValue: '#007bff' },
    { 
      key: 'customizations.font_style', 
      label: 'Font Family', 
      type: 'select', 
      section: 'customization',
      options: [
        { value: 'Work Sans', label: 'Work Sans' },
        { value: 'Inter', label: 'Inter' },
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Poppins', label: 'Poppins' }
      ],
      defaultValue: 'Work Sans'
    }
  ];

  const sectionFields = formFields.filter(field => field.section === activeSection);

  const handleFieldChange = (fieldKey: string, value: any) => {
    const updatedData = setNestedProperty(data, fieldKey, value);
    onChange(updatedData);
  };

  const getFieldValue = (fieldKey: string) => {
    return getNestedProperty(data, fieldKey);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        {sectionFields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={getFieldValue(field.key)}
            onChange={(value) => handleFieldChange(field.key, value)}
          />
        ))}
      </div>
      
      {sectionFields.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No fields available for this section.</p>
          <p className="text-sm">Select a different section from the sidebar.</p>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
