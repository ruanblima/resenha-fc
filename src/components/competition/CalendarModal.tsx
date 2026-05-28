import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../../theme';

/* ── Types ──────────────────────────────────────────────────── */

interface Props {
  visible: boolean;
  selectedDate: string; // YYYY-MM-DD
  onSelect: (iso: string) => void;
  onClose: () => void;
}

/* ── Helpers ────────────────────────────────────────────────── */

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DAY_HEADERS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function getDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getTodayISO(): string {
  return getDateISO(new Date());
}

/** Returns all day cells to display for a given month (including padding nulls) */
function buildMonthGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/* ── Component ──────────────────────────────────────────────── */

export function CalendarModal({ visible, selectedDate, onSelect, onClose }: Props) {
  const parsed = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date();
  const [viewYear, setViewYear] = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());

  // Sync view whenever modal opens or selected date changes
  useEffect(() => {
    if (visible && selectedDate) {
      const d = new Date(selectedDate + 'T00:00:00');
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [visible, selectedDate]);

  const todayISO = getTodayISO();
  const cells = buildMonthGrid(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  function handleDay(day: number | null) {
    if (!day) return;
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSelect(iso);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}
        onPress={onClose}
      >
        {/* Calendar card — stop propagation */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: 340,
            backgroundColor: colors.surfaceHigh,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: `${colors.outlineVariant}40`,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 18,
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: `${colors.outlineVariant}25`,
            }}
          >
            <TouchableOpacity onPress={prevMonth} hitSlop={8}>
              <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'AnyBody-ExtraBold',
                fontSize: 16,
                color: colors.onSurface,
                letterSpacing: 0.5,
              }}
            >
              {MONTH_NAMES[viewMonth]} {viewYear}
            </Text>

            <TouchableOpacity onPress={nextMonth} hitSlop={8}>
              <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          {/* Day headers */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}>
            {DAY_HEADERS.map((h, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 11,
                    color: `${colors.onSurfaceVariant}80`,
                    letterSpacing: 0.5,
                  }}
                >
                  {h}
                </Text>
              </View>
            ))}
          </View>

          {/* Day grid */}
          <View style={{ paddingHorizontal: 16, paddingBottom: 18 }}>
            {Array.from({ length: cells.length / 7 }, (_, row) => (
              <View key={row} style={{ flexDirection: 'row' }}>
                {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
                  if (!day) {
                    return <View key={col} style={{ flex: 1, height: 40 }} />;
                  }
                  const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = iso === selectedDate;
                  const isToday = iso === todayISO;

                  return (
                    <TouchableOpacity
                      key={col}
                      onPress={() => handleDay(day)}
                      activeOpacity={0.7}
                      style={{
                        flex: 1,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: isSelected
                            ? colors.primary
                            : isToday
                            ? `${colors.primary}18`
                            : 'transparent',
                          borderWidth: isToday && !isSelected ? 1 : 0,
                          borderColor: `${colors.primary}50`,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: isSelected ? 'AnyBody-ExtraBold' : 'Inter_600SemiBold',
                            fontSize: 13,
                            color: isSelected
                              ? colors.onPrimary
                              : isToday
                              ? colors.primary
                              : colors.onSurface,
                          }}
                        >
                          {day}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 8,
              paddingHorizontal: 20,
              paddingBottom: 16,
              borderTopWidth: 1,
              borderTopColor: `${colors.outlineVariant}25`,
              paddingTop: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                const today = new Date();
                onSelect(getDateISO(today));
                onClose();
              }}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: `${colors.primary}50`,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 12,
                  color: colors.primary,
                }}
              >
                Hoje
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: `${colors.outlineVariant}25`,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 12,
                  color: colors.onSurfaceVariant,
                }}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
