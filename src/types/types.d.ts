type FilterMarkChar = 'popular' | 'star' | 'clip' | 'mute';

type TagSetting = { filterMarksJson: string };
type TagsSettings = Record<string, TagSetting>;
type ExtensionSettings = { tagsSettings: TagsSettings };
