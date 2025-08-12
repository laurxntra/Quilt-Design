import * as assert from 'assert';
import { NW, SE, NE, SW, GREEN, RED, ROUND, Square, Row, rnil, rcons, qnil, qcons, STRAIGHT } from './quilt';
import { PatternA, PatternB, PatternC, PatternD, PatternE } from './patterns';

describe('patterns', function() {
  // Feel free to use these in your tests (though it's not required)
  // and create any other consts you find useful:
  //
  const nw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_rnd_red: Square = {shape: ROUND, color: RED, corner: NW};
  const nw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NW};
  const nw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NW};

  const ne_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NE};
  const ne_rnd_red: Square = {shape: ROUND, color: RED, corner: NE};
  const ne_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NE};
  const ne_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NE};

  const se_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_rnd_red: Square = {shape: ROUND, color: RED, corner: SE};
  const se_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SE};
  const se_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SE};

  const sw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_rnd_red: Square = {shape: ROUND, color: RED, corner: SW};
  const sw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SW};
  const sw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SW};

  it('PatternA', function() {
    const row_green: Row = rcons(ne_rnd_grn, rcons(ne_rnd_grn, rnil));
    const row_red: Row = rcons(ne_rnd_red, rcons(ne_rnd_red, rnil));

    // Negative Conditionals
    assert.throws(() => PatternA(-1, GREEN));
    assert.throws(() => PatternA(-1, RED));

    assert.throws(() => PatternA(-10, GREEN));
    assert.throws(() => PatternA(-10, RED));

    // 0-1-many: base cases
    assert.deepEqual(PatternA(0, GREEN), qnil);
    assert.deepEqual(PatternA(0, RED), qnil);

    // 0-1-many: one recursive call
    assert.deepEqual(PatternA(1, GREEN), qcons(row_green, qnil));
    assert.deepEqual(PatternA(1, RED), qcons(row_red, qnil));

    // 0-1-many: greater than one recursive call
    assert.deepEqual(PatternA(3, GREEN), qcons(row_green, qcons(row_green, qcons(row_green, qnil))));
    assert.deepEqual(PatternA(3, RED),qcons(row_red, qcons(row_red, qcons(row_red, qnil))));

    // 0-1-many: greater than one recursive call, second case
    assert.deepEqual(PatternA(4, GREEN), qcons(row_green, qcons(row_green, qcons(row_green, 
          qcons(row_green, qnil)))));
    assert.deepEqual(PatternA(4, RED), qcons(row_red, qcons(row_red, qcons(row_red,
          qcons(row_red, qnil)))));
  });

  it('PatternB', function() {
    const row_green: Row = rcons(ne_strt_grn, rcons(sw_strt_grn, rnil));
    const row_red: Row = rcons(ne_strt_red, rcons(sw_strt_red, rnil));

    // Negative Conditional
    assert.throws(() => PatternB(-1, GREEN));
    assert.throws(() => PatternB(-1, RED));

    assert.throws(() => PatternB(-10, GREEN));
    assert.throws(() => PatternB(-10, RED));

    // 0-1-many: base cases
    assert.deepEqual(PatternB(0, GREEN), qnil);
    assert.deepEqual(PatternB(0, RED), qnil);

    // 0-1-many: one recursive call
    assert.deepEqual(PatternB(1, GREEN), qcons(row_green, qnil));
    assert.deepEqual(PatternB(1, RED), qcons(row_red, qnil));

    // 0-1-many: many recursive call case
    assert.deepEqual(PatternB(3, GREEN),
        qcons(row_green, qcons(row_green, qcons(row_green, qnil))));
    assert.deepEqual(PatternB(3, RED),
        qcons(row_red, qcons(row_red, qcons(row_red, qnil))));

     // 0-1-many: many recursive call, second case
    assert.deepEqual(PatternB(4, GREEN),
        qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
    assert.deepEqual(PatternB(4, RED),
        qcons(row_red, qcons(row_red, qcons(row_red, qcons(row_red, qnil)))));

  });

  it('PatternC', function() {
    const row_green_top: Row = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
    const row_green_bot: Row = rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil));
    const row_red_top: Row = rcons(se_rnd_red, rcons(sw_rnd_red, rnil));
    const row_red_bot: Row = rcons(ne_rnd_red, rcons(nw_rnd_red, rnil)); 

    // Negative conditional
    assert.throws(() => PatternC(-1, GREEN));
    assert.throws(() => PatternC(-1, RED));
    assert.throws(() => PatternC(-10, GREEN));
    assert.throws(() => PatternC(-10, RED));

    // 0-1-many:base cases
    assert.deepEqual(PatternC(0, GREEN), qnil);
    assert.deepEqual(PatternC(0, RED), qnil);   

    // Odd case
    assert.throws(() => PatternC(1, GREEN));
    assert.throws(() => PatternC(1, RED));

    assert.throws(() => PatternC(3, GREEN));
    assert.throws(() => PatternC(3, RED));   

    // 0-1-many: one recursive call
    assert.deepEqual(PatternC(2, GREEN), qcons(row_green_top, qcons(row_green_bot, qnil)));
    assert.deepEqual(PatternC(2, RED), qcons(row_red_top, qcons(row_red_bot, qnil)));

    // 0-1-many: many recursive call case
    assert.deepEqual(PatternC(4, GREEN), qcons(row_green_top, qcons(row_green_bot, 
            qcons(row_green_top, qcons(row_green_bot, qnil)))));
    assert.deepEqual(PatternC(4, RED), qcons(row_red_top, qcons(row_red_bot, 
            qcons(row_red_top, qcons(row_red_bot, qnil)))));

    // 0-1-many: many recursive call, second case
    assert.deepEqual(PatternC(6, GREEN), qcons(row_green_top, qcons(row_green_bot, 
          qcons(row_green_top, qcons(row_green_bot, qcons(row_green_top, qcons(row_green_bot, qnil)))))));
    assert.deepEqual(PatternC(6, RED), qcons(row_red_top, qcons(row_red_bot, 
          qcons(row_red_top, qcons(row_red_bot, qcons(row_red_top, qcons(row_red_bot, qnil)))))));   
  });

  it('PatternD', function() {
    const row_green_top: Row = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil));
    const row_green_bot: Row = rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil));
    const row_red_top: Row = rcons(nw_rnd_red, rcons(ne_rnd_red, rnil));
    const row_red_bot: Row = rcons(sw_rnd_red, rcons(se_rnd_red, rnil));

    // Negative conditional
    assert.throws(() => PatternD(-1, GREEN), "NegativeRowValue");
    assert.throws(() => PatternD(-1, RED), "NegativeRowValue");

    assert.throws(() => PatternD(-10, GREEN), "NegativeRowValue");
    assert.throws(() => PatternD(-10, RED), "NegativeRowValue");

    // 0-1-many heuristic, base cases
    assert.deepEqual(PatternD(0, GREEN), qnil);
    assert.deepEqual(PatternD(0, RED), qnil);

    // Odd case
    assert.throws(() => PatternD(1, GREEN), "OddRowValue");
    assert.throws(() => PatternD(1, RED), "OddRowValue");

    // Odd case, 2nd case
    assert.throws(() => PatternD(3, GREEN), "OddRowValue");
    assert.throws(() => PatternD(3, RED), "OddRowValue");

    // 0-1-many: one recursive call
    assert.deepEqual(PatternD(2, GREEN),qcons(row_green_top, qcons(row_green_bot, qnil)));
    assert.deepEqual(PatternD(2, RED), qcons(row_red_top, qcons(row_red_bot, qnil)));

    // 0-1-many: many recursive call case
    assert.deepEqual(PatternD(4, GREEN), qcons(row_green_top, qcons(row_green_bot, 
          qcons(row_green_top, qcons(row_green_bot, qnil)))));
    assert.deepEqual(PatternD(4, RED), qcons(row_red_top, qcons(row_red_bot, 
          qcons(row_red_top, qcons(row_red_bot, qnil)))));

    // 0-1-many: many recursive call, second case
    assert.deepEqual(PatternD(6, GREEN), qcons(row_green_top, qcons(row_green_bot, 
          qcons(row_green_top, qcons(row_green_bot, qcons(row_green_top, qcons(row_green_bot, qnil)))))));
    assert.deepEqual(PatternD(6, RED), qcons(row_red_top, qcons(row_red_bot, qcons(row_red_top,
          qcons(row_red_bot, qcons(row_red_top, qcons(row_red_bot, qnil)))))));
  });

  it('PatternE', function() {
    const row_green_top: Row = rcons(ne_strt_grn, rcons(sw_strt_grn, rnil));
    const row_green_bot: Row = rcons(se_strt_grn, rcons(nw_strt_grn, rnil));
    const row_red_top: Row = rcons(ne_strt_red, rcons(sw_strt_red, rnil));
    const row_red_bot: Row = rcons(se_strt_red, rcons(nw_strt_red, rnil));

    // Negative conditional
    assert.throws(() => PatternE(-1, GREEN));
    assert.throws(() => PatternE(-1, RED));
    assert.throws(() => PatternE(-10, GREEN));
    assert.throws(() => PatternE(-10, RED));

    // 0-1-many: base cases
    assert.deepEqual(PatternE(0, GREEN), qnil);
    assert.deepEqual(PatternE(0, RED), qnil);

    // // 0-1-many: base cases, second case
    assert.deepEqual(PatternE(1, GREEN), qcons(row_green_top, qnil));
    assert.deepEqual(PatternE(1, RED), qcons(row_red_top, qnil));

    // 0-1-many: one recursive call
    assert.deepEqual(PatternE(2, GREEN), qcons(row_green_top, qcons(row_green_bot, qnil)));
    assert.deepEqual(PatternE(2, RED), qcons(row_red_top, qcons(row_red_bot, qnil)));

    // 0-1-many: many recursive call case
    assert.deepEqual(PatternE(4, GREEN), qcons(row_green_top, qcons(row_green_bot, 
          qcons(row_green_top, qcons(row_green_bot, qnil)))));
    assert.deepEqual(PatternE(4, RED), qcons(row_red_top, qcons(row_red_bot, 
          qcons(row_red_top, qcons(row_red_bot, qnil)))));

    // 0-1-many: many recursive call, second case
    assert.deepEqual(PatternE(6, GREEN), qcons(row_green_top, qcons(row_green_bot, 
          qcons(row_green_top, qcons(row_green_bot, qcons(row_green_top, qcons(row_green_bot, qnil)))))));
    assert.deepEqual(PatternE(6, RED), qcons(row_red_top, qcons(row_red_bot, qcons(row_red_top, 
          qcons(row_red_bot, qcons(row_red_top, qcons(row_red_bot, qnil)))))));
  });
});
