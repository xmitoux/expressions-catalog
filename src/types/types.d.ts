type FilterMarkChar = 'popular' | '🌟' | '📎' | '👎';

type FilterMark = Record<string, string[]>;
type ExtensionSettings = { filterMark: FilterMark };

type ImageTagMap = Map<string, string>;
