"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  iniciarTareaDevService,
  iniciarTareaService,
  completarTareaService,
  revisarTareaService,
  revisarTareaDevService,
} from "@/services/tareas.service";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useState } from "react";
import { Calendar } from "lucide-react";

const PRIORIDAD_COLOR = {
  ALTA: "bg-red-100 text-red-700",
  MEDIA: "bg-yellow-100 text-yellow-700",
  BAJA: "bg-green-100 text-green-700",
};

const ACCIONES = {
  1: {
    TODO: {
      service: iniciarTareaDevService,
      label: "Iniciar",
      style: "default",
    },
    IN_PROGRESS: {
      service: revisarTareaDevService,
      label: "Enviar a revisión",
      style: "yellow",
    },
    IN_REVIEW: null,
    DONE: null,
  },
  2: {
    TODO: { service: iniciarTareaService, label: "Iniciar", style: "default" },
    IN_PROGRESS: {
      service: revisarTareaService,
      label: "En revisión",
      style: "yellow",
    },
    IN_REVIEW: {
      service: completarTareaService,
      label: "Completar",
      style: "green",
    },
    DONE: null,
  },
  3: {
    TODO: { service: iniciarTareaService, label: "Iniciar", style: "default" },
    IN_PROGRESS: {
      service: revisarTareaService,
      label: "En revisión",
      style: "yellow",
    },
    IN_REVIEW: {
      service: completarTareaService,
      label: "Completar",
      style: "green",
    },
    DONE: null,
  },
};

const BUTTON_STYLES = {
  default: "w-full",
  yellow: "w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50",
  green: "w-full border-green-500 text-green-600 hover:bg-green-50",
};

export const TareaCard = ({ tarea, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const rol = useAuthStore((state) => state.usuario?.rol);

  const accion = ACCIONES[rol]?.[tarea.estado];

  const handleAccion = async () => {
    if (!accion) return;
    setLoading(true);
    try {
      await accion.service(tarea.id_tarea);
      toast.success("Tarea actualizada");
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-sm text-slate-800">{tarea.titulo}</p>
          <span
            className={`shrink-0 text-xs font-semibold ${PRIORIDAD_COLOR[tarea.prioridad]}`}
          >
            {tarea.prioridad}
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2">
          {tarea.descripcion}
        </p>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="size-3" />
          <span>{new Date(tarea.due_date).toLocaleDateString("es-PE")}</span>
        </div>

        {accion && (
          <Button
            size="sm"
            variant={accion.style === "default" ? "default" : "outline"}
            className={BUTTON_STYLES[accion.style]}
            disabled={loading}
            onClick={handleAccion}
          >
            {loading ? "Actualizando..." : accion.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
