
// Format tanggal Indonesia (tanpa jam)
export function formatTanggal(dateEvent ,timeEvent) {
  if (!dateEvent) return "";

  const eventDate = new Date(`${dateEvent}T${timeEvent}Z`);

  const options = {
    weekday: "short",   // Senin, Selasa
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(eventDate);
}

// Format jam Indonesia (tanpa tanggal)
export function formatJam(dateEvent, timeEvent) {
  if (!dateEvent || !timeEvent) return "";

  const eventDate = new Date(`${dateEvent}T${timeEvent}Z`);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(eventDate);
}
