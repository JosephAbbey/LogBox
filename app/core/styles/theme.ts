import { createTheme } from '@mui/material/styles';

var themes = {
    dark: {
        name: 'GitHub Dark',
        colors: {
            text: '#fff',
            textSecondary: '#f1f1f1',
            background: '#24292e',
            green: '#34d058',
            red: '#f9826c',
            grey: '#868d95',
            blue: '#79b8ff',
            paper: '#1f2428',
            darkGrey: '#6a737d',
            yellow: '#cca700',
            primary: '#0366d6',
        },
        code: {
            colors: {
                focusBorder: '#005cc5',
                foreground: '#d1d5da',
                descriptionForeground: '#959da5',
                errorForeground: '#f97583',
                'textLink.foreground': '#79b8ff',
                'textLink.activeForeground': '#c8e1ff',
                'textBlockQuote.background': '#24292e',
                'textBlockQuote.border': '#444d56',
                'textCodeBlock.background': '#2f363d',
                'textPreformat.foreground': '#d1d5da',
                'textSeparator.foreground': '#586069',
                'button.background': '#176f2c',
                'button.foreground': '#dcffe4',
                'button.hoverBackground': '#22863a',
                'button.secondaryBackground': '#444d56',
                'button.secondaryForeground': '#fff',
                'button.secondaryHoverBackground': '#586069',
                'checkbox.background': '#444d56',
                'checkbox.border': '#1b1f23',
                'dropdown.background': '#2f363d',
                'dropdown.border': '#1b1f23',
                'dropdown.foreground': '#e1e4e8',
                'dropdown.listBackground': '#24292e',
                'input.background': '#2f363d',
                'input.border': '#1b1f23',
                'input.foreground': '#e1e4e8',
                'input.placeholderForeground': '#959da5',
                'badge.foreground': '#c8e1ff',
                'badge.background': '#044289',
                'progressBar.background': '#0366d6',
                'titleBar.activeForeground': '#e1e4e8',
                'titleBar.activeBackground': '#24292e',
                'titleBar.inactiveForeground': '#959da5',
                'titleBar.inactiveBackground': '#1f2428',
                'titleBar.border': '#1b1f23',
                'activityBar.foreground': '#e1e4e8',
                'activityBar.inactiveForeground': '#6a737d',
                'activityBar.background': '#24292e',
                'activityBarBadge.foreground': '#fff',
                'activityBarBadge.background': '#0366d6',
                'activityBar.activeBorder': '#f9826c',
                'activityBar.border': '#1b1f23',
                'sideBar.foreground': '#d1d5da',
                'sideBar.background': '#1f2428',
                'sideBar.border': '#1b1f23',
                'sideBarTitle.foreground': '#e1e4e8',
                'sideBarSectionHeader.foreground': '#e1e4e8',
                'sideBarSectionHeader.background': '#1f2428',
                'sideBarSectionHeader.border': '#1b1f23',
                'list.hoverForeground': '#e1e4e8',
                'list.inactiveSelectionForeground': '#e1e4e8',
                'list.activeSelectionForeground': '#e1e4e8',
                'list.hoverBackground': '#282e34',
                'list.inactiveSelectionBackground': '#282e34',
                'list.activeSelectionBackground': '#39414a',
                'list.inactiveFocusBackground': '#1d2d3e',
                'list.focusBackground': '#044289',
                'tree.indentGuidesStroke': '#2f363d',
                'notificationCenterHeader.foreground': '#959da5',
                'notificationCenterHeader.background': '#24292e',
                'notifications.foreground': '#e1e4e8',
                'notifications.background': '#2f363d',
                'notifications.border': '#1b1f23',
                'notificationsErrorIcon.foreground': '#ea4a5a',
                'notificationsWarningIcon.foreground': '#ffab70',
                'notificationsInfoIcon.foreground': '#79b8ff',
                'pickerGroup.border': '#444d56',
                'pickerGroup.foreground': '#e1e4e8',
                'quickInput.background': '#24292e',
                'quickInput.foreground': '#e1e4e8',
                'statusBar.foreground': '#d1d5da',
                'statusBar.background': '#24292e',
                'statusBar.border': '#1b1f23',
                'statusBar.noFolderBackground': '#24292e',
                'statusBar.debuggingBackground': '#931c06',
                'statusBar.debuggingForeground': '#fff',
                'statusBarItem.prominentBackground': '#282e34',
                'editorGroupHeader.tabsBackground': '#1f2428',
                'editorGroupHeader.tabsBorder': '#1b1f23',
                'editorGroup.border': '#1b1f23',
                'tab.activeForeground': '#e1e4e8',
                'tab.inactiveForeground': '#959da5',
                'tab.inactiveBackground': '#1f2428',
                'tab.activeBackground': '#24292e',
                'tab.hoverBackground': '#24292e',
                'tab.unfocusedHoverBackground': '#24292e',
                'tab.border': '#1b1f23',
                'tab.unfocusedActiveBorderTop': '#1b1f23',
                'tab.activeBorder': '#24292e',
                'tab.unfocusedActiveBorder': '#24292e',
                'tab.activeBorderTop': '#f9826c',
                'breadcrumb.foreground': '#959da5',
                'breadcrumb.focusForeground': '#e1e4e8',
                'breadcrumb.activeSelectionForeground': '#d1d5da',
                'breadcrumbPicker.background': '#2b3036',
                'editor.foreground': '#e1e4e8',
                'editor.background': '#24292e',
                'editorWidget.background': '#1f2428',
                'editor.foldBackground': '#58606915',
                'editor.lineHighlightBackground': '#2b3036',
                'editorLineNumber.foreground': '#444d56',
                'editorLineNumber.activeForeground': '#e1e4e8',
                'editorIndentGuide.background': '#2f363d',
                'editorIndentGuide.activeBackground': '#444d56',
                'editorWhitespace.foreground': '#444d56',
                'editorCursor.foreground': '#c8e1ff',
                'editorError.foreground': '#f97583',
                'editorWarning.foreground': '#ffea7f',
                'editor.findMatchBackground': '#ffd33d44',
                'editor.findMatchHighlightBackground': '#ffd33d22',
                'editor.linkedEditingBackground': '#3392FF22',
                'editor.inactiveSelectionBackground': '#3392FF22',
                'editor.selectionBackground': '#3392FF44',
                'editor.selectionHighlightBackground': '#17E5E633',
                'editor.selectionHighlightBorder': '#17E5E600',
                'editor.wordHighlightBackground': '#17E5E600',
                'editor.wordHighlightStrongBackground': '#17E5E600',
                'editor.wordHighlightBorder': '#17E5E699',
                'editor.wordHighlightStrongBorder': '#17E5E666',
                'editorBracketMatch.background': '#17E5E650',
                'editorBracketMatch.border': '#17E5E600',
                'editorGutter.modifiedBackground': '#2188ff',
                'editorGutter.addedBackground': '#28a745',
                'editorGutter.deletedBackground': '#ea4a5a',
                'diffEditor.insertedTextBackground': '#28a74530',
                'diffEditor.removedTextBackground': '#d73a4930',
                'scrollbar.shadow': '#0008',
                'scrollbarSlider.background': '#6a737d33',
                'scrollbarSlider.hoverBackground': '#6a737d44',
                'scrollbarSlider.activeBackground': '#6a737d88',
                'editorOverviewRuler.border': '#1b1f23',
                'panel.background': '#1f2428',
                'panel.border': '#1b1f23',
                'panelTitle.activeBorder': '#f9826c',
                'panelTitle.activeForeground': '#e1e4e8',
                'panelTitle.inactiveForeground': '#959da5',
                'panelInput.border': '#2f363d',
                'terminal.foreground': '#d1d5da',
                'terminal.tab.activeBorder': '#f9826c',
                'terminalCursor.background': '#586069',
                'terminalCursor.foreground': '#79b8ff',
                'terminal.ansiBrightWhite': '#fafbfc',
                'terminal.ansiWhite': '#d1d5da',
                'terminal.ansiBrightBlack': '#959da5',
                'terminal.ansiBlack': '#586069',
                'terminal.ansiBlue': '#2188ff',
                'terminal.ansiBrightBlue': '#79b8ff',
                'terminal.ansiGreen': '#34d058',
                'terminal.ansiBrightGreen': '#85e89d',
                'terminal.ansiCyan': '#39c5cf',
                'terminal.ansiBrightCyan': '#56d4dd',
                'terminal.ansiRed': '#ea4a5a',
                'terminal.ansiBrightRed': '#f97583',
                'terminal.ansiMagenta': '#b392f0',
                'terminal.ansiBrightMagenta': '#b392f0',
                'terminal.ansiYellow': '#ffea7f',
                'terminal.ansiBrightYellow': '#ffea7f',
                'editorBracketHighlight.foreground1': '#79b8ff',
                'editorBracketHighlight.foreground2': '#ffab70',
                'editorBracketHighlight.foreground3': '#b392f0',
                'editorBracketHighlight.foreground4': '#79b8ff',
                'editorBracketHighlight.foreground5': '#ffab70',
                'editorBracketHighlight.foreground6': '#b392f0',
                'gitDecoration.addedResourceForeground': '#34d058',
                'gitDecoration.modifiedResourceForeground': '#79b8ff',
                'gitDecoration.deletedResourceForeground': '#ea4a5a',
                'gitDecoration.untrackedResourceForeground': '#34d058',
                'gitDecoration.ignoredResourceForeground': '#6a737d',
                'gitDecoration.conflictingResourceForeground': '#ffab70',
                'gitDecoration.submoduleResourceForeground': '#6a737d',
                'debugToolBar.background': '#2b3036',
                'editor.stackFrameHighlightBackground': '#C6902625',
                'editor.focusedStackFrameHighlightBackground': '#2b6a3033',
                'peekViewEditor.matchHighlightBackground': '#ffd33d33',
                'peekViewResult.matchHighlightBackground': '#ffd33d33',
                'peekViewEditor.background': '#1f242888',
                'peekViewResult.background': '#1f2428',
                'settings.headerForeground': '#e1e4e8',
                'settings.modifiedItemIndicator': '#0366d6',
                'welcomePage.buttonBackground': '#2f363d',
                'welcomePage.buttonHoverBackground': '#444d56',
            },
            semanticHighlighting: true,
            tokenColors: [
                {
                    scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
                    settings: {
                        foreground: '#6a737d',
                    },
                },
                {
                    scope: [
                        'constant',
                        'entity.name.constant',
                        'variable.other.constant',
                        'variable.language',
                    ],
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: ['entity', 'entity.name'],
                    settings: {
                        foreground: '#b392f0',
                    },
                },
                {
                    scope: 'variable.parameter.function',
                    settings: {
                        foreground: '#e1e4e8',
                    },
                },
                {
                    scope: 'entity.name.tag',
                    settings: {
                        foreground: '#85e89d',
                    },
                },
                {
                    scope: 'keyword',
                    settings: {
                        foreground: '#f97583',
                    },
                },
                {
                    scope: ['storage', 'storage.type'],
                    settings: {
                        foreground: '#f97583',
                    },
                },
                {
                    scope: [
                        'storage.modifier.package',
                        'storage.modifier.import',
                        'storage.type.java',
                    ],
                    settings: {
                        foreground: '#e1e4e8',
                    },
                },
                {
                    scope: [
                        'string',
                        'punctuation.definition.string',
                        'string punctuation.section.embedded source',
                    ],
                    settings: {
                        foreground: '#9ecbff',
                    },
                },
                {
                    scope: 'support',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'meta.property-name',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'variable',
                    settings: {
                        foreground: '#ffab70',
                    },
                },
                {
                    scope: 'variable.other',
                    settings: {
                        foreground: '#e1e4e8',
                    },
                },
                {
                    scope: 'invalid.broken',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#fdaeb7',
                    },
                },
                {
                    scope: 'invalid.deprecated',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#fdaeb7',
                    },
                },
                {
                    scope: 'invalid.illegal',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#fdaeb7',
                    },
                },
                {
                    scope: 'invalid.unimplemented',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#fdaeb7',
                    },
                },
                {
                    scope: 'carriage-return',
                    settings: {
                        fontStyle: 'italic underline',
                        background: '#f97583',
                        foreground: '#24292e',
                        content: '^M',
                    },
                },
                {
                    scope: 'message.error',
                    settings: {
                        foreground: '#fdaeb7',
                    },
                },
                {
                    scope: 'string source',
                    settings: {
                        foreground: '#e1e4e8',
                    },
                },
                {
                    scope: 'string variable',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: ['source.regexp', 'string.regexp'],
                    settings: {
                        foreground: '#dbedff',
                    },
                },
                {
                    scope: [
                        'string.regexp.character-class',
                        'string.regexp constant.character.escape',
                        'string.regexp source.ruby.embedded',
                        'string.regexp string.regexp.arbitrary-repitition',
                    ],
                    settings: {
                        foreground: '#dbedff',
                    },
                },
                {
                    scope: 'string.regexp constant.character.escape',
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#85e89d',
                    },
                },
                {
                    scope: 'support.constant',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'support.variable',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'meta.module-reference',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'punctuation.definition.list.begin.markdown',
                    settings: {
                        foreground: '#ffab70',
                    },
                },
                {
                    scope: ['markup.heading', 'markup.heading entity.name'],
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'markup.quote',
                    settings: {
                        foreground: '#85e89d',
                    },
                },
                {
                    scope: 'markup.italic',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#e1e4e8',
                    },
                },
                {
                    scope: 'markup.bold',
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#e1e4e8',
                    },
                },
                {
                    scope: 'markup.raw',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: [
                        'markup.deleted',
                        'meta.diff.header.from-file',
                        'punctuation.definition.deleted',
                    ],
                    settings: {
                        background: '#86181d',
                        foreground: '#fdaeb7',
                    },
                },
                {
                    scope: [
                        'markup.inserted',
                        'meta.diff.header.to-file',
                        'punctuation.definition.inserted',
                    ],
                    settings: {
                        background: '#144620',
                        foreground: '#85e89d',
                    },
                },
                {
                    scope: ['markup.changed', 'punctuation.definition.changed'],
                    settings: {
                        background: '#c24e00',
                        foreground: '#ffab70',
                    },
                },
                {
                    scope: ['markup.ignored', 'markup.untracked'],
                    settings: {
                        foreground: '#2f363d',
                        background: '#79b8ff',
                    },
                },
                {
                    scope: 'meta.diff.range',
                    settings: {
                        foreground: '#b392f0',
                        fontStyle: 'bold',
                    },
                },
                {
                    scope: 'meta.diff.header',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'meta.separator',
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: 'meta.output',
                    settings: {
                        foreground: '#79b8ff',
                    },
                },
                {
                    scope: [
                        'brackethighlighter.tag',
                        'brackethighlighter.curly',
                        'brackethighlighter.round',
                        'brackethighlighter.square',
                        'brackethighlighter.angle',
                        'brackethighlighter.quote',
                    ],
                    settings: {
                        foreground: '#d1d5da',
                    },
                },
                {
                    scope: 'brackethighlighter.unmatched',
                    settings: {
                        foreground: '#fdaeb7',
                    },
                },
                {
                    scope: ['constant.other.reference.link', 'string.other.link'],
                    settings: {
                        foreground: '#dbedff',
                        fontStyle: 'underline',
                    },
                },
            ],
        },
    },
    light: {
        name: 'GitHub Light',
        colors: {
            text: '#24292e',
            textSecondary: '#6a737d',
            background: '#fff',
            green: '#28a745',
            red: '#b01011',
            grey: '#868d95',
            blue: '#005cc5',
            paper: '#fafafa',
            darkGrey: '#6a737d',
            yellow: '#855f00',
            primary: '#2188ff',
        },
        code: {
            colors: {
                focusBorder: '#2188ff',
                foreground: '#444d56',
                descriptionForeground: '#6a737d',
                errorForeground: '#cb2431',
                'textLink.foreground': '#0366d6',
                'textLink.activeForeground': '#005cc5',
                'textBlockQuote.background': '#fafbfc',
                'textBlockQuote.border': '#e1e4e8',
                'textCodeBlock.background': '#f6f8fa',
                'textPreformat.foreground': '#586069',
                'textSeparator.foreground': '#d1d5da',
                'button.background': '#159739',
                'button.foreground': '#fff',
                'button.hoverBackground': '#138934',
                'button.secondaryBackground': '#e1e4e8',
                'button.secondaryForeground': '#1b1f23',
                'button.secondaryHoverBackground': '#d1d5da',
                'checkbox.background': '#fafbfc',
                'checkbox.border': '#d1d5da',
                'dropdown.background': '#fafbfc',
                'dropdown.border': '#e1e4e8',
                'dropdown.foreground': '#2f363d',
                'dropdown.listBackground': '#fff',
                'input.background': '#fafbfc',
                'input.border': '#e1e4e8',
                'input.foreground': '#2f363d',
                'input.placeholderForeground': '#959da5',
                'badge.foreground': '#005cc5',
                'badge.background': '#dbedff',
                'progressBar.background': '#2188ff',
                'titleBar.activeForeground': '#2f363d',
                'titleBar.activeBackground': '#fff',
                'titleBar.inactiveForeground': '#6a737d',
                'titleBar.inactiveBackground': '#f6f8fa',
                'titleBar.border': '#e1e4e8',
                'activityBar.foreground': '#2f363d',
                'activityBar.inactiveForeground': '#959da5',
                'activityBar.background': '#fff',
                'activityBarBadge.foreground': '#fff',
                'activityBarBadge.background': '#2188ff',
                'activityBar.activeBorder': '#f9826c',
                'activityBar.border': '#e1e4e8',
                'sideBar.foreground': '#586069',
                'sideBar.background': '#f6f8fa',
                'sideBar.border': '#e1e4e8',
                'sideBarTitle.foreground': '#2f363d',
                'sideBarSectionHeader.foreground': '#2f363d',
                'sideBarSectionHeader.background': '#f6f8fa',
                'sideBarSectionHeader.border': '#e1e4e8',
                'list.hoverForeground': '#2f363d',
                'list.inactiveSelectionForeground': '#2f363d',
                'list.activeSelectionForeground': '#2f363d',
                'list.hoverBackground': '#ebf0f4',
                'list.inactiveSelectionBackground': '#e8eaed',
                'list.activeSelectionBackground': '#e2e5e9',
                'list.inactiveFocusBackground': '#dbedff',
                'list.focusBackground': '#cce5ff',
                'tree.indentGuidesStroke': '#e1e4e8',
                'notificationCenterHeader.foreground': '#6a737d',
                'notificationCenterHeader.background': '#e1e4e8',
                'notifications.foreground': '#2f363d',
                'notifications.background': '#fafbfc',
                'notifications.border': '#e1e4e8',
                'notificationsErrorIcon.foreground': '#d73a49',
                'notificationsWarningIcon.foreground': '#e36209',
                'notificationsInfoIcon.foreground': '#005cc5',
                'pickerGroup.border': '#e1e4e8',
                'pickerGroup.foreground': '#2f363d',
                'quickInput.background': '#fafbfc',
                'quickInput.foreground': '#2f363d',
                'statusBar.foreground': '#586069',
                'statusBar.background': '#fff',
                'statusBar.border': '#e1e4e8',
                'statusBar.noFolderBackground': '#fff',
                'statusBar.debuggingBackground': '#f9826c',
                'statusBar.debuggingForeground': '#fff',
                'statusBarItem.prominentBackground': '#e8eaed',
                'editorGroupHeader.tabsBackground': '#f6f8fa',
                'editorGroupHeader.tabsBorder': '#e1e4e8',
                'editorGroup.border': '#e1e4e8',
                'tab.activeForeground': '#2f363d',
                'tab.inactiveForeground': '#6a737d',
                'tab.inactiveBackground': '#f6f8fa',
                'tab.activeBackground': '#fff',
                'tab.hoverBackground': '#fff',
                'tab.unfocusedHoverBackground': '#fff',
                'tab.border': '#e1e4e8',
                'tab.unfocusedActiveBorderTop': '#e1e4e8',
                'tab.activeBorder': '#fff',
                'tab.unfocusedActiveBorder': '#fff',
                'tab.activeBorderTop': '#f9826c',
                'breadcrumb.foreground': '#6a737d',
                'breadcrumb.focusForeground': '#2f363d',
                'breadcrumb.activeSelectionForeground': '#586069',
                'breadcrumbPicker.background': '#fafbfc',
                'editor.foreground': '#24292e',
                'editor.background': '#fff',
                'editorWidget.background': '#f6f8fa',
                'editor.foldBackground': '#d1d5da11',
                'editor.lineHighlightBackground': '#f6f8fa',
                'editorLineNumber.foreground': '#1b1f234d',
                'editorLineNumber.activeForeground': '#24292e',
                'editorIndentGuide.background': '#eff2f6',
                'editorIndentGuide.activeBackground': '#d7dbe0',
                'editorWhitespace.foreground': '#d1d5da',
                'editorCursor.foreground': '#044289',
                'editorError.foreground': '#cb2431',
                'editorWarning.foreground': '#f9c513',
                'editor.findMatchBackground': '#ffdf5d',
                'editor.findMatchHighlightBackground': '#ffdf5d66',
                'editor.linkedEditingBackground': '#0366d611',
                'editor.inactiveSelectionBackground': '#0366d611',
                'editor.selectionBackground': '#0366d625',
                'editor.selectionHighlightBackground': '#34d05840',
                'editor.selectionHighlightBorder': '#34d05800',
                'editor.wordHighlightBackground': '#34d05800',
                'editor.wordHighlightStrongBackground': '#34d05800',
                'editor.wordHighlightBorder': '#24943e99',
                'editor.wordHighlightStrongBorder': '#24943e50',
                'editorBracketMatch.background': '#34d05840',
                'editorBracketMatch.border': '#34d05800',
                'editorGutter.modifiedBackground': '#2188ff',
                'editorGutter.addedBackground': '#28a745',
                'editorGutter.deletedBackground': '#d73a49',
                'diffEditor.insertedTextBackground': '#34d05822',
                'diffEditor.removedTextBackground': '#d73a4922',
                'scrollbar.shadow': '#6a737d33',
                'scrollbarSlider.background': '#959da533',
                'scrollbarSlider.hoverBackground': '#959da544',
                'scrollbarSlider.activeBackground': '#959da588',
                'editorOverviewRuler.border': '#fff',
                'panel.background': '#f6f8fa',
                'panel.border': '#e1e4e8',
                'panelTitle.activeBorder': '#f9826c',
                'panelTitle.activeForeground': '#2f363d',
                'panelTitle.inactiveForeground': '#6a737d',
                'panelInput.border': '#e1e4e8',
                'terminal.foreground': '#586069',
                'terminal.tab.activeBorder': '#f9826c',
                'terminalCursor.background': '#d1d5da',
                'terminalCursor.foreground': '#005cc5',
                'terminal.ansiBrightWhite': '#d1d5da',
                'terminal.ansiWhite': '#6a737d',
                'terminal.ansiBrightBlack': '#959da5',
                'terminal.ansiBlack': '#24292e',
                'terminal.ansiBlue': '#0366d6',
                'terminal.ansiBrightBlue': '#005cc5',
                'terminal.ansiGreen': '#28a745',
                'terminal.ansiBrightGreen': '#22863a',
                'terminal.ansiCyan': '#1b7c83',
                'terminal.ansiBrightCyan': '#3192aa',
                'terminal.ansiRed': '#d73a49',
                'terminal.ansiBrightRed': '#cb2431',
                'terminal.ansiMagenta': '#5a32a3',
                'terminal.ansiBrightMagenta': '#5a32a3',
                'terminal.ansiYellow': '#dbab09',
                'terminal.ansiBrightYellow': '#b08800',
                'editorBracketHighlight.foreground1': '#005cc5',
                'editorBracketHighlight.foreground2': '#e36209',
                'editorBracketHighlight.foreground3': '#5a32a3',
                'editorBracketHighlight.foreground4': '#005cc5',
                'editorBracketHighlight.foreground5': '#e36209',
                'editorBracketHighlight.foreground6': '#5a32a3',
                'gitDecoration.addedResourceForeground': '#28a745',
                'gitDecoration.modifiedResourceForeground': '#005cc5',
                'gitDecoration.deletedResourceForeground': '#d73a49',
                'gitDecoration.untrackedResourceForeground': '#28a745',
                'gitDecoration.ignoredResourceForeground': '#959da5',
                'gitDecoration.conflictingResourceForeground': '#e36209',
                'gitDecoration.submoduleResourceForeground': '#959da5',
                'debugToolBar.background': '#fff',
                'editor.stackFrameHighlightBackground': '#ffd33d33',
                'editor.focusedStackFrameHighlightBackground': '#28a74525',
                'settings.headerForeground': '#2f363d',
                'settings.modifiedItemIndicator': '#2188ff',
                'welcomePage.buttonBackground': '#f6f8fa',
                'welcomePage.buttonHoverBackground': '#e1e4e8',
            },
            semanticHighlighting: true,
            tokenColors: [
                {
                    scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
                    settings: {
                        foreground: '#6a737d',
                    },
                },
                {
                    scope: [
                        'constant',
                        'entity.name.constant',
                        'variable.other.constant',
                        'variable.language',
                    ],
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: ['entity', 'entity.name'],
                    settings: {
                        foreground: '#6f42c1',
                    },
                },
                {
                    scope: 'variable.parameter.function',
                    settings: {
                        foreground: '#24292e',
                    },
                },
                {
                    scope: 'entity.name.tag',
                    settings: {
                        foreground: '#22863a',
                    },
                },
                {
                    scope: 'keyword',
                    settings: {
                        foreground: '#d73a49',
                    },
                },
                {
                    scope: ['storage', 'storage.type'],
                    settings: {
                        foreground: '#d73a49',
                    },
                },
                {
                    scope: [
                        'storage.modifier.package',
                        'storage.modifier.import',
                        'storage.type.java',
                    ],
                    settings: {
                        foreground: '#24292e',
                    },
                },
                {
                    scope: [
                        'string',
                        'punctuation.definition.string',
                        'string punctuation.section.embedded source',
                    ],
                    settings: {
                        foreground: '#032f62',
                    },
                },
                {
                    scope: 'support',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'meta.property-name',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'variable',
                    settings: {
                        foreground: '#e36209',
                    },
                },
                {
                    scope: 'variable.other',
                    settings: {
                        foreground: '#24292e',
                    },
                },
                {
                    scope: 'invalid.broken',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#b31d28',
                    },
                },
                {
                    scope: 'invalid.deprecated',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#b31d28',
                    },
                },
                {
                    scope: 'invalid.illegal',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#b31d28',
                    },
                },
                {
                    scope: 'invalid.unimplemented',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#b31d28',
                    },
                },
                {
                    scope: 'carriage-return',
                    settings: {
                        fontStyle: 'italic underline',
                        background: '#d73a49',
                        foreground: '#fafbfc',
                        content: '^M',
                    },
                },
                {
                    scope: 'message.error',
                    settings: {
                        foreground: '#b31d28',
                    },
                },
                {
                    scope: 'string source',
                    settings: {
                        foreground: '#24292e',
                    },
                },
                {
                    scope: 'string variable',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: ['source.regexp', 'string.regexp'],
                    settings: {
                        foreground: '#032f62',
                    },
                },
                {
                    scope: [
                        'string.regexp.character-class',
                        'string.regexp constant.character.escape',
                        'string.regexp source.ruby.embedded',
                        'string.regexp string.regexp.arbitrary-repitition',
                    ],
                    settings: {
                        foreground: '#032f62',
                    },
                },
                {
                    scope: 'string.regexp constant.character.escape',
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#22863a',
                    },
                },
                {
                    scope: 'support.constant',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'support.variable',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'meta.module-reference',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'punctuation.definition.list.begin.markdown',
                    settings: {
                        foreground: '#e36209',
                    },
                },
                {
                    scope: ['markup.heading', 'markup.heading entity.name'],
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'markup.quote',
                    settings: {
                        foreground: '#22863a',
                    },
                },
                {
                    scope: 'markup.italic',
                    settings: {
                        fontStyle: 'italic',
                        foreground: '#24292e',
                    },
                },
                {
                    scope: 'markup.bold',
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#24292e',
                    },
                },
                {
                    scope: 'markup.raw',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: [
                        'markup.deleted',
                        'meta.diff.header.from-file',
                        'punctuation.definition.deleted',
                    ],
                    settings: {
                        background: '#ffeef0',
                        foreground: '#b31d28',
                    },
                },
                {
                    scope: [
                        'markup.inserted',
                        'meta.diff.header.to-file',
                        'punctuation.definition.inserted',
                    ],
                    settings: {
                        background: '#f0fff4',
                        foreground: '#22863a',
                    },
                },
                {
                    scope: ['markup.changed', 'punctuation.definition.changed'],
                    settings: {
                        background: '#ffebda',
                        foreground: '#e36209',
                    },
                },
                {
                    scope: ['markup.ignored', 'markup.untracked'],
                    settings: {
                        foreground: '#f6f8fa',
                        background: '#005cc5',
                    },
                },
                {
                    scope: 'meta.diff.range',
                    settings: {
                        foreground: '#6f42c1',
                        fontStyle: 'bold',
                    },
                },
                {
                    scope: 'meta.diff.header',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'meta.separator',
                    settings: {
                        fontStyle: 'bold',
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: 'meta.output',
                    settings: {
                        foreground: '#005cc5',
                    },
                },
                {
                    scope: [
                        'brackethighlighter.tag',
                        'brackethighlighter.curly',
                        'brackethighlighter.round',
                        'brackethighlighter.square',
                        'brackethighlighter.angle',
                        'brackethighlighter.quote',
                    ],
                    settings: {
                        foreground: '#586069',
                    },
                },
                {
                    scope: 'brackethighlighter.unmatched',
                    settings: {
                        foreground: '#b31d28',
                    },
                },
                {
                    scope: ['constant.other.reference.link', 'string.other.link'],
                    settings: {
                        foreground: '#032f62',
                        fontStyle: 'underline',
                    },
                },
            ],
        },
    },
};

function convert(theme: typeof themes[keyof typeof themes]) {
    return {
        base: 'vs-dark',
        inherit: false,
        semanticHighlighting: true,
        colors: theme.code.colors,
        rules: theme.code.tokenColors.flatMap(
            (tokenColor: { scope: string | string[]; settings: any }) => {
                if (typeof tokenColor.scope === 'string') {
                    return {
                        token: tokenColor.scope,
                        ...tokenColor.settings,
                    };
                } else {
                    return tokenColor.scope.map((scope) => {
                        return {
                            token: scope,
                            ...tokenColor.settings,
                        };
                    });
                }
            },
        ),
        enhancedTokensColors: [],
    };
}

var code = {
    dark: convert(themes.dark),
    light: convert(themes.light),
};

// Monaco editor example:
// monaco.editor.defineTheme('dark', code.dark);
// monaco.editor.defineTheme('light', code.light);
// document.getElementById('code').style.backgroundColor = code.dark.colors['editor.background'];
// monaco.editor.colorizeElement(document.getElementById('code'), {
//     theme: 'dark',
//     tabSize: 4,
// });

// Create a theme instance.
const theme = (mode: 'light' | 'dark' = 'light') =>
    createTheme({
        palette: {
            mode,
            background: {
                paper: themes[mode].colors.paper,
                default: themes[mode].colors.background,
            },
            text: {
                disabled: themes[mode].colors.grey,
                primary: themes[mode].colors.text,
                secondary: themes[mode].colors.textSecondary,
            },
            error: {
                main: themes[mode].colors.red,
            },
            success: {
                main: themes[mode].colors.green,
            },
            primary: {
                main: themes[mode].colors.primary,
            },
            grey: {
                '100': themes[mode].colors.grey,
                '200': themes[mode].colors.darkGrey,
            },
            warning: {
                main: themes[mode].colors.yellow,
            },
            info: {
                main: themes[mode].colors.text,
            },
        },
    });

export default theme;
