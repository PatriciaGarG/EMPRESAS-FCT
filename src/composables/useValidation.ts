// src/composables/useValidation.ts

import type { AlumnData } from '../types/alumnData';

export function useValidation() {
  const validateAlumnForm = (form: AlumnData) => {
    const errors: Record<string, string> = {};

    if (!form.first_name.trim()) {
      errors.first_name = 'El nombre es obligatorio';
    }

    if (!form.last_name_1.trim()) {
      errors.last_name_1 = 'El primer apellido es obligatorio';
    }

    if (!form.dni.trim()) {
      errors.dni = 'El DNI es obligatorio.';
    } else if (!/^\d{8}[A-Za-z]$/.test(form.dni)) {
      errors.dni = 'El DNI no es válido';
    }

    if (!form.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio.';
    } else if (!/^\d{9}$/.test(form.phone)) {
      errors.phone = 'Debe tener 9 dígitos';
    }

    if (!form.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) {
      errors.email = 'El email no es válido.';
    }

    if (!form.enrollment_center.trim()) {
      errors.enrollment_center = 'El centro es obligatorio';
    }

    if (!form.province_id) {
      errors.province_id = 'Selecciona una provincia';
    }

    if (!form.cycle_id) {
      errors.cycle_id = 'Selecciona un ciclo';
    }

    if (!form.modality_id) {
      errors.modality_id = 'Selecciona una modalidad';
    }

    return errors;
  };

  const validateField = (
    field: keyof AlumnData,
    value: string | number | null
  ) => {
    switch (field) {
      case 'first_name':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'El nombre es obligatorio';
        }
        break;
      case 'last_name_1':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'El primer apellido es obligatorio';
        }
        break;
      case 'dni':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'El DNI es obligatorio.';
        } else if (!/^\d{8}[A-Za-z]$/.test(value)) {
          return 'El DNI no es válido';
        }
        break;
      case 'phone':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'El teléfono es obligatorio.';
        } else if (!/^\d{9}$/.test(value)) {
          return 'Debe tener 9 dígitos';
        }
        break;
      case 'email':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'El email es obligatorio';
        } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
          return 'El email no es válido.';
        }
        break;
      case 'enrollment_center':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'El centro es obligatorio';
        }
        break;
      case 'province_id':
        if (!value) return 'Selecciona una provincia';
        break;
      case 'cycle_id':
        if (!value) return 'Selecciona un ciclo';
        break;
      case 'modality_id':
        if (!value) return 'Selecciona una modalidad';
        break;
    }
    
    return '';
  };
  return { validateAlumnForm, validateField };
}
