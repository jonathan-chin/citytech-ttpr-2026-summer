import { useState, useMemo } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonRange,
} from '@ionic/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from 'recharts';

import { sightings, furColors, dayRange } from '../data/squirrels';

const ACTS = ['running', 'chasing', 'climbing', 'eating', 'foraging'] as const;
const FUR: Record<string, string> = {
  Gray: '#4c72b0',
  Cinnamon: '#dd8452',
  Black: '#55a868',
};

const Home: React.FC = () => {
  const [furSel, setFurSel] = useState<string[]>(furColors);
  const [dayLo, setDayLo] = useState(dayRange.min);
  const [dayHi, setDayHi] = useState(dayRange.max);

  const filtered = useMemo(
    () => sightings.filter((s) => furSel.includes(s.fur) && s.day >= dayLo && s.day <= dayHi),
    [furSel, dayLo, dayHi],
  );

  const activityData = useMemo(
    () =>
      ACTS.map((a) => ({ activity: a, count: filtered.filter((s) => s[a]).length })).sort(
        (x, y) => y.count - x.count,
      ),
    [filtered],
  );

  const furData = useMemo(
    () =>
      furColors
        .map((f) => ({ name: f, count: filtered.filter((s) => s.fur === f).length }))
        .filter((d) => d.count > 0),
    [filtered],
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Squirrel Census Charts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Filters */}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Filters</IonCardSubtitle>
            <IonCardTitle>{filtered.length} squirrels shown</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonSelect
                label="Fur color"
                multiple
                value={furSel}
                onIonChange={(e) => setFurSel(e.detail.value)}
              >
                {furColors.map((f) => (
                  <IonSelectOption key={f} value={f}>
                    {f}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                Date (Oct 2018): day {dayLo} to {dayHi}
              </IonLabel>
            </IonItem>
            <IonRange
              dualKnobs
              pin
              min={dayRange.min}
              max={dayRange.max}
              step={1}
              value={{ lower: dayLo, upper: dayHi }}
              onIonChange={(e) => {
                const v = e.detail.value as { lower: number; upper: number };
                setDayLo(v.lower);
                setDayHi(v.upper);
              }}
            />
          </IonCardContent>
        </IonCard>

        {/* Bar chart */}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Bar chart</IonCardSubtitle>
            <IonCardTitle>What are they doing?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4c72b0" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </IonCardContent>
        </IonCard>

        {/* Pie chart */}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Pie chart</IonCardSubtitle>
            <IonCardTitle>Fur color</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={furData}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={95}
                  label
                  isAnimationActive={false}
                >
                  {furData.map((entry) => (
                    <Cell key={entry.name} fill={FUR[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </IonCardContent>
        </IonCard>

        {/* Scatter chart, one series per fur color */}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Scatter chart</IonCardSubtitle>
            <IonCardTitle>Where they were seen (by fur color)</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="longitude" domain={['dataMin', 'dataMax']} tick={false} />
                <YAxis type="number" dataKey="y" name="latitude" domain={['dataMin', 'dataMax']} tick={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                {furColors
                  .filter((f) => furSel.includes(f))
                  .map((f) => (
                    <Scatter
                      key={f}
                      name={f}
                      data={filtered.filter((s) => s.fur === f)}
                      fill={FUR[f]}
                      fillOpacity={0.7}
                      isAnimationActive={false}
                    />
                  ))}
              </ScatterChart>
            </ResponsiveContainer>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
