interface Project {
  id: string;           // уникальный slug: "telegram-bot-analytics"
  type: 'code' | 'video'; // разделяем специализации
  title: string;
  description: string;
  thumbnail: string;    // путь к картинке-превью
  tags: string[];       // ['React', 'TypeScript'] или ['Premiere Pro']
  featured: boolean;    // показывать на главной?
  date: string;         // "2025-03-15" — для сортировки

  // Поля, специфичные для кода
  code?: {
    githubUrl: string;
    liveUrl?: string;
    stack: string[];
  };

  // Поля, специфичные для видео
  video?: {
    videoUrl: string;   // YouTube/Vimeo
    duration: string;   // "2:35"
    role: string;       // "Монтаж, цветокоррекция"
  };
}