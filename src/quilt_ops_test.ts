import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, RED, ROUND, STRAIGHT, Square, rnil, rcons, qnil, qcons, Row } from './quilt';
import { sflip_vert, rflip_vert, qflip_vert, sflip_horz, rflip_horz, qflip_horz, sew, symmetrize } from './quilt_ops';


describe('quilt_ops', function() {

  // Feel free to use these consts in your tests (though it's not required)
  // and create any others you find useful!

  const nw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NW};
  const ne_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NE};
  const se_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_rnd_red: Square = {shape: ROUND, color: RED, corner: SE};
  const sw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_rnd_red: Square = {shape: ROUND, color: RED, corner: SW};
  const sw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SW};
  const nw_sq: Square = {corner: NW, color: GREEN, shape: ROUND};
  const ne_sq: Square = {corner: NE, color: GREEN, shape: ROUND};
  const se_sq: Square = {corner: SE, color: GREEN, shape: ROUND};
  const sw_sq: Square = {corner: SW, color: GREEN, shape: ROUND};
  const r_nw_rnd_grn = rcons(nw_rnd_grn, rnil);
  const r_ne_rnd_grn = rcons(ne_rnd_grn, rnil);
  const r_rnd_grn = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil));
  const r_sew_rnd_grn = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
  const r_swe_rnd_grn = rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil));
  const r3_rnd_grn = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil))));
  const r4_rnd_grn = rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil))));
  const r1: Row = rcons(nw_sq, rnil);
  const r2: Row = rcons(sw_sq, rnil);
  const r3: Row = rcons(nw_sq, rcons(nw_sq, rnil));
  const r4: Row = rcons(sw_sq, rcons(sw_sq, rnil));


  it('sflip_vert', function() {
    // Exhausive rotation Cases
    assert.deepStrictEqual(sflip_vert(sw_strt_red), nw_strt_red);
    assert.deepStrictEqual(sflip_vert(nw_sq), sw_sq);
    assert.deepStrictEqual(sflip_vert(ne_sq), se_sq);
    assert.deepStrictEqual(sflip_vert(sw_sq), nw_sq);
    assert.deepStrictEqual(sflip_vert(se_sq), ne_sq);
  });

  it('rflip_vert', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(rflip_vert(rnil), rnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(rflip_vert(rcons(sw_sq, rnil)), rcons(nw_sq, rnil));

    // 0-1-many: one recursive call, second case (different way)
    assert.deepStrictEqual(rflip_vert(rcons(nw_sq, rnil)), rcons(sw_sq, rnil));

    // 0-1-many: greater than one recursive call
    assert.deepStrictEqual(rflip_vert(rcons(nw_sq, (rcons(nw_sq, rnil)))), rcons(sw_sq, rcons(sw_sq, rnil)));

    // 0-1-many: greater than one recursive call, second case
    assert.deepStrictEqual(rflip_vert(rcons(sw_sq, (rcons(sw_sq, rnil)))), rcons(nw_sq, rcons(nw_sq, rnil)));
  });

  it('qflip_vert', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(qflip_vert(qnil), qnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(qflip_vert(qcons(r1, qnil)), qcons(rcons(sw_sq, rnil), qnil));

    // 0-1-many: one recursive call, second case ( different way)
    assert.deepStrictEqual(qflip_vert(qcons(r2, qnil)), qcons(rcons(nw_sq, rnil), qnil));

    // 0-1-many: greater than one recursive call
    assert.deepStrictEqual(qflip_vert(qcons(r3, qcons(r3, qnil))), qcons(rcons(sw_sq, rcons(sw_sq, rnil)),
                           qcons(rcons(sw_sq, rcons(sw_sq, rnil)), qnil)));

    // 0-1-many: greater than one recursive call, second case
    assert.deepStrictEqual(qflip_vert(qcons(r4, qcons(r4, qnil))), qcons(rcons(nw_sq, rcons(nw_sq, rnil)),
                           qcons(rcons(nw_sq, rcons(nw_sq, rnil)), qnil)));
  });

  it('sflip_horz', function() {
    // Exhaustive flip cases
    assert.deepStrictEqual(sflip_horz(sw_rnd_red), se_rnd_red);
    assert.deepStrictEqual(sflip_vert(nw_sq), sw_sq);
    assert.deepStrictEqual(sflip_vert(ne_sq), se_sq);
    assert.deepStrictEqual(sflip_vert(sw_sq), nw_sq);
    assert.deepStrictEqual(sflip_vert(se_sq), ne_sq);
  });

  it('rflip_horz', function() {
    // 0-1-many, base case
    assert.deepStrictEqual(rflip_horz(r_nw_rnd_grn), r_ne_rnd_grn);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(rflip_horz(rcons(sw_sq, rnil)), rcons(se_sq, rnil)); 

    // 0-1-many: one recursive call, 2nd case (different way)
    assert.deepStrictEqual(rflip_horz(rcons(nw_sq, rnil)), rcons(ne_sq, rnil));

    // 0-1-many: greater than one recursive call
    assert.deepStrictEqual(rflip_horz(rcons(nw_sq, (rcons(nw_sq, rnil)))), rcons(ne_sq, rcons(ne_sq, rnil))); 

    // 0-1-many: greater than one recursive call, second case
    assert.deepStrictEqual(rflip_horz(rcons(sw_sq, (rcons(sw_sq, rnil)))), rcons(se_sq, rcons(se_sq, rnil)));
    
  });

  it('qflip_horz', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(
        qflip_horz(qcons(r_ne_rnd_grn, qcons(r_nw_rnd_grn, qnil))),
        qcons(r_nw_rnd_grn, qcons(r_ne_rnd_grn, qnil)));

    // 0-1-many: one recursive call
     assert.deepStrictEqual(qflip_horz(qcons(r1, qnil)), qcons(rcons(ne_sq, rnil), qnil));

    // 0-1-many: one recursive call, second case (different way)
     assert.deepStrictEqual(qflip_horz(qcons(r2, qnil)), qcons(rcons(se_sq, rnil), qnil));

    // 0-1-many: greater than one recursive call
     assert.deepStrictEqual(qflip_horz(qcons(r3, (qcons(r3, qnil)))), qcons(rcons(ne_sq, rcons(ne_sq, rnil)), 
                              qcons(rcons(ne_sq, rcons(ne_sq, rnil)), qnil))); 

    // 0-1-many: greater than one recursive call, second case
     assert.deepStrictEqual(qflip_horz(qcons(r4, (qcons(r4, qnil)))), qcons(rcons(se_sq, rcons(se_sq, rnil)), 
                            qcons(rcons(se_sq, rcons(se_sq, rnil)), qnil)));
  });



  it('sew', function() {
    // invalid case: (qnil, !qnil)
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qnil)), Error);
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))), Error);

    // invalid case: (!qnil, qnil)
    assert.throws(() => sew(qcons(r_rnd_grn, qnil), qnil), Error);
    assert.throws(() => sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qnil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(sew(qnil, qnil), qnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(sew(qcons(r_rnd_grn, qnil), qcons(r_rnd_grn, qnil)), qcons(r3_rnd_grn, qnil));
    assert.deepStrictEqual(sew(qcons(r_sew_rnd_grn, qnil), qcons(r_sew_rnd_grn, qnil)), qcons(r4_rnd_grn, qnil));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(
        sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))),
        qcons(r3_rnd_grn, qcons(r3_rnd_grn, qnil)));
    assert.deepStrictEqual(
        sew(qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qnil))), 
            qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qnil)))),
        qcons(r4_rnd_grn, qcons(r4_rnd_grn, qcons(r4_rnd_grn, qnil))));
  });

  it('symmetrize', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(symmetrize(qnil), qnil);
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));

    // 0-1-many: one recursive call
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));
    assert.deepStrictEqual(symmetrize(qcons(rcons(se_rnd_grn, rnil), qnil)),
        qcons(rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil)),
            qcons(rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil)), qnil)));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qnil)),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qnil)));
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qcons(r_swe_rnd_grn, qnil))),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qcons(
                    rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
                    qcons(
                        rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                        qnil)))));
  });

});
