import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import PressableWithFeedback from '@components/Pressable/PressableWithFeedback';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import RadioListItem from './RadioListItem';
import type {BaseListItemProps} from './types';
import UserListItem from './UserListItem';

function BaseListItem({
    item,
    isFocused = false,
    isDisabled = false,
    showTooltip,
    shouldPreventDefaultFocusOnSelectRow = false,
    canSelectMultiple = false,
    onSelectRow,
    onDismissError = () => {},
    keyForList,
}: BaseListItemProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const {translate} = useLocalize();
    const isRadioItem = item.rightElement === undefined;

    return (
        <OfflineWithFeedback
            onClose={() => onDismissError(item)}
            pendingAction={item.pendingAction}
            errors={item.errors}
            errorRowStyles={styles.ph5}
        >
            <PressableWithFeedback
                onPress={() => onSelectRow(item)}
                disabled={isDisabled}
                accessibilityLabel={item.text}
                role={CONST.ROLE.BUTTON}
                hoverDimmingValue={1}
                hoverStyle={styles.hoveredComponentBG}
                dataSet={{[CONST.SELECTION_SCRAPER_HIDDEN_ELEMENT]: true}}
                onMouseDown={shouldPreventDefaultFocusOnSelectRow ? (e) => e.preventDefault() : undefined}
                nativeID={keyForList}
            >
                <View
                    style={[
                        styles.flex1,
                        styles.justifyContentBetween,
                        styles.sidebarLinkInner,
                        styles.userSelectNone,
                        isRadioItem ? styles.optionRow : styles.peopleRow,
                        isFocused && styles.sidebarLinkActive,
                    ]}
                >
                    {canSelectMultiple && (
                        <View style={StyleUtils.getCheckboxPressableStyle()}>
                            <View
                                style={[
                                    StyleUtils.getCheckboxContainerStyle(20),
                                    styles.mr3,
                                    item.isSelected && styles.checkedContainer,
                                    item.isSelected && styles.borderColorFocus,
                                    item.isDisabled && styles.cursorDisabled,
                                    item.isDisabled && styles.buttonOpacityDisabled,
                                ]}
                            >
                                {item.isSelected && (
                                    <Icon
                                        src={Expensicons.Checkmark}
                                        fill={theme.textLight}
                                        height={14}
                                        width={14}
                                    />
                                )}
                            </View>
                        </View>
                    )}

                    {isRadioItem ? (
                        <RadioListItem
                            item={item}
                            textStyles={[
                                styles.optionDisplayName,
                                isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText,
                                item.isSelected ?? item.alternateText ? styles.sidebarLinkTextBold : null,
                                styles.pre,
                                item.alternateText ? styles.mb1 : null,
                            ]}
                            alternateTextStyles={[styles.optionAlternateText, styles.textLabelSupporting, isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText, styles.pre]}
                            isDisabled={isDisabled}
                            onSelectRow={onSelectRow}
                            showTooltip={showTooltip}
                        />
                    ) : (
                        <UserListItem
                            item={item}
                            textStyles={[
                                styles.optionDisplayName,
                                isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText,
                                styles.sidebarLinkTextBold,
                                styles.pre,
                                item.alternateText ? styles.mb1 : null,
                            ]}
                            alternateTextStyles={[styles.optionAlternateText, styles.textLabelSupporting, isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText, styles.pre]}
                            isDisabled={isDisabled}
                            onSelectRow={onSelectRow}
                            showTooltip={showTooltip}
                        />
                    )}
                    {!canSelectMultiple && item.isSelected && (
                        <View
                            style={[styles.flexRow, styles.alignItemsCenter, styles.ml3]}
                            accessible={false}
                        >
                            <View>
                                <Icon
                                    src={Expensicons.Checkmark}
                                    fill={theme.success}
                                />
                            </View>
                        </View>
                    )}
                </View>
                {!!item.invitedSecondaryLogin && (
                    <Text style={[styles.ml9, styles.ph5, styles.pb3, styles.textLabelSupporting]}>
                        {translate('workspace.people.invitedBySecondaryLogin', {secondaryLogin: item.invitedSecondaryLogin})}
                    </Text>
                )}
            </PressableWithFeedback>
        </OfflineWithFeedback>
    );
}

BaseListItem.displayName = 'BaseListItem';

export default BaseListItem;
